import {randomUUID} from 'node:crypto';
import mongoose from 'mongoose';
import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {dbConnect} from '@/lib/mongodb';
import {dateOnly} from '@/lib/dates';
import {getAvailability} from '@/lib/availability';
import Booking from '@/models/Booking';
import RoomType from '@/models/RoomType';
import {sendBookingConfirmation,sendOwnerNotification} from '@/lib/email';
import {rateLimit} from '@/lib/rate-limit';

const schema=z.object({roomTypeId:z.string().min(1),checkIn:z.string().date(),checkOut:z.string().date(),numRooms:z.coerce.number().int().min(1).max(10),numGuests:z.coerce.number().int().min(1).max(30),guest:z.object({fullName:z.string().trim().min(2).max(100),email:z.string().email(),phone:z.string().trim().min(6).max(30),notes:z.string().max(1000).optional()})});

export async function POST(req:NextRequest){
  const p=schema.safeParse(await req.json().catch(()=>null));
  if(!p.success)return NextResponse.json({error:'Invalid booking details',details:p.error.flatten()},{status:400});
  const d=p.data,start=dateOnly(d.checkIn),end=dateOnly(d.checkOut);
  if(end<=start)return NextResponse.json({error:'Check-out must be after check-in'},{status:400});

  try{
    await dbConnect();
    const address=req.headers.get('cf-connecting-ip')||'unknown';
    if(!await rateLimit(`booking:${address}`,5))return NextResponse.json({error:'Too many requests. Please try again later.'},{status:429});

    const ref=`TH-${d.checkIn.replaceAll('-','')}-${randomUUID().replaceAll('-','').slice(0,12).toUpperCase()}`;
    const session=await mongoose.startSession();
    let room:any,booking:any;
    try{
      await session.withTransaction(async()=>{
        // Updating one shared room document serializes competing reservations for this type.
        room=await RoomType.findOneAndUpdate({_id:d.roomTypeId,active:true},{$inc:{bookingRevision:1}},{new:true,session});
        if(!room)throw new Error('ROOM_TYPE_NOT_FOUND');
        if(room.totalUnits<d.numRooms)throw new Error('REQUEST_EXCEEDS_CAPACITY');
        if(room.maxGuests>0&&d.numGuests>room.maxGuests*d.numRooms)throw new Error('GUEST_LIMIT_EXCEEDED');
        const availability=await getAvailability(d.roomTypeId,start,end,session);
        if(!availability.available||availability.remainingUnits<d.numRooms)throw new Error('ROOMS_UNAVAILABLE');
        booking=new Booking({bookingReference:ref,roomTypeId:d.roomTypeId,checkIn:start,checkOut:end,numRooms:d.numRooms,numGuests:d.numGuests,guest:d.guest,status:'pending',emailStatus:'pending'});
        await booking.save({session});
      });
    }finally{await session.endSession();}

    const mail={bookingReference:ref,checkIn:start,checkOut:end,roomName:room.name,numRooms:d.numRooms,numGuests:d.numGuests,guest:d.guest};
    const [guestDelivery,ownerDelivery]=await Promise.allSettled([sendBookingConfirmation(mail),sendOwnerNotification(mail)]);
    const guestEmailStatus=guestDelivery.status==='fulfilled'?'sent':'failed',ownerEmailStatus=ownerDelivery.status==='fulfilled'?'sent':'failed';
    const emailStatus=guestEmailStatus==='sent'&&ownerEmailStatus==='sent'?'sent':'failed';
    await Booking.updateOne({_id:booking._id},{$set:{emailStatus,guestEmailStatus,ownerEmailStatus}});
    return NextResponse.json({bookingReference:ref,emailSent:guestEmailStatus==='sent'},{status:201});
  }catch(e){
    const message=e instanceof Error?e.message:'';
    const response=message==='ROOM_TYPE_NOT_FOUND'?{error:'Room type not found',status:404}:message==='ROOMS_UNAVAILABLE'||message==='REQUEST_EXCEEDS_CAPACITY'?{error:'The requested number of rooms is not available for every night.',status:409}:message==='GUEST_LIMIT_EXCEEDED'?{error:'The selected room type cannot accommodate that many guests.',status:400}:{error:'Booking request could not be saved. Please try again or contact us.',status:500};
    return NextResponse.json({error:response.error},{status:response.status});
  }
}
