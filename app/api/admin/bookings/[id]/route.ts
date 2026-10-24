import mongoose from 'mongoose';
import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {dbConnect} from '@/lib/mongodb';
import Booking from '@/models/Booking';
import RoomType from '@/models/RoomType';
import {getAvailability} from '@/lib/availability';
import {requireAdmin,adminError} from '@/lib/admin';
import {sendBookingConfirmation,sendOwnerNotification,sendBookingStatusUpdate} from '@/lib/email';

const schema=z.object({status:z.enum(['pending','confirmed','cancelled','checked_in','checked_out','no_show']).optional(),adminNotes:z.string().max(2000).optional(),retryEmail:z.boolean().optional(),retryStatusEmail:z.boolean().optional()});
const activeStatuses=['pending','confirmed','checked_in'];

export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){
  try{
    const {id}=await params;await requireAdmin();const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:'Invalid update'},{status:400});await dbConnect();
    const booking=await Booking.findById(id).populate('roomTypeId','name');if(!booking)return NextResponse.json({error:'Booking not found'},{status:404});
    if(p.data.retryStatusEmail){if(!booking.statusEmailFor||booking.status!==booking.statusEmailFor)return NextResponse.json({error:'No failed status email to retry.'},{status:400});const mail={bookingReference:booking.bookingReference,checkIn:booking.checkIn,checkOut:booking.checkOut,roomName:(booking.roomTypeId as any).name,numRooms:booking.numRooms,numGuests:booking.numGuests,guest:booking.guest};try{await sendBookingStatusUpdate(mail,booking.statusEmailFor);await Booking.updateOne({_id:id},{$set:{statusEmailStatus:'sent'}});return NextResponse.json({statusEmailStatus:'sent'});}catch{await Booking.updateOne({_id:id},{$set:{statusEmailStatus:'failed'}});return NextResponse.json({error:'Status email delivery failed',statusEmailStatus:'failed'},{status:502});}}
    if(p.data.retryEmail){
      const mail={bookingReference:booking.bookingReference,checkIn:booking.checkIn,checkOut:booking.checkOut,roomName:(booking.roomTypeId as any).name,numRooms:booking.numRooms,numGuests:booking.numGuests,guest:booking.guest};
      const tasks:Promise<unknown>[]=[];if(booking.guestEmailStatus!=='sent')tasks.push(sendBookingConfirmation(mail));if(booking.ownerEmailStatus!=='sent')tasks.push(sendOwnerNotification(mail));
      const results=await Promise.allSettled(tasks);let index=0;const guestStatus=booking.guestEmailStatus==='sent'?'sent':results[index++]?.status==='fulfilled'?'sent':'failed';const ownerStatus=booking.ownerEmailStatus==='sent'?'sent':results[index]?.status==='fulfilled'?'sent':'failed';
      const sent=guestStatus==='sent'&&ownerStatus==='sent';await Booking.updateOne({_id:id},{$set:{emailStatus:sent?'sent':'failed',guestEmailStatus:guestStatus,ownerEmailStatus:ownerStatus}});
      return NextResponse.json({emailStatus:sent?'sent':'failed',guestEmailStatus:guestStatus,ownerEmailStatus:ownerStatus},{status:sent?200:502});
    }
    const nextStatus=p.data.status;
    const statusChanged=!!nextStatus&&nextStatus!==booking.status;
    if(statusChanged&&nextStatus){
      const wasInactive=!activeStatuses.includes(booking.status),willBeActive=activeStatuses.includes(nextStatus);
      if(wasInactive&&willBeActive){
        const session=await mongoose.startSession();
        try{await session.withTransaction(async()=>{
          const roomId=String((booking.roomTypeId as any)._id||booking.roomTypeId);
          await RoomType.updateOne({_id:roomId},{$inc:{bookingRevision:1}},{session});
          const availability=await getAvailability(roomId,booking.checkIn,booking.checkOut,session,id);
          if(!availability.available||availability.remainingUnits<booking.numRooms)throw new Error('ROOMS_UNAVAILABLE');
          await Booking.updateOne({_id:id},{$set:{status:nextStatus,...(p.data.adminNotes!==undefined?{adminNotes:p.data.adminNotes}:{})}},{session});
        });}finally{await session.endSession();}
      }else await Booking.updateOne({_id:id},{$set:{status:nextStatus,...(p.data.adminNotes!==undefined?{adminNotes:p.data.adminNotes}:{})}});
    }else if(p.data.adminNotes!==undefined)await Booking.updateOne({_id:id},{$set:{adminNotes:p.data.adminNotes}});
    if(statusChanged&&nextStatus&&(nextStatus==='confirmed'||nextStatus==='cancelled')){
      const mail={bookingReference:booking.bookingReference,checkIn:booking.checkIn,checkOut:booking.checkOut,roomName:(booking.roomTypeId as any).name,numRooms:booking.numRooms,numGuests:booking.numGuests,guest:booking.guest};
      try{await sendBookingStatusUpdate(mail,nextStatus);await Booking.updateOne({_id:id},{$set:{statusEmailStatus:'sent',statusEmailFor:nextStatus}});}
      catch{await Booking.updateOne({_id:id},{$set:{statusEmailStatus:'failed',statusEmailFor:nextStatus}});}
    }
    const updated=await Booking.findById(id).populate('roomTypeId','name');return NextResponse.json(updated);
  }catch(e){if(e instanceof Error&&e.message==='ROOMS_UNAVAILABLE')return NextResponse.json({error:'Cannot reactivate this booking: the room type is no longer available for all requested nights.'},{status:409});return adminError(e);}
}
