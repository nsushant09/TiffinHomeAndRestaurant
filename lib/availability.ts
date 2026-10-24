import Booking from '@/models/Booking';
import BlockedDate from '@/models/BlockedDate';
import RoomType from '@/models/RoomType';
import { nights } from './dates';
import type { ClientSession } from 'mongoose';

export async function getAvailability(roomTypeId:string,startDate:Date,endDate:Date,session?:ClientSession,excludeBookingId?:string) {
  const roomQuery=RoomType.findById(roomTypeId);
  if(session)roomQuery.session(session);
  const room:any=await roomQuery.lean();
  if(!room) throw new Error('Room type not found');
  const bookingFilter:any={roomTypeId,status:{$in:['pending','confirmed','checked_in']},checkIn:{$lt:endDate},checkOut:{$gt:startDate}};
  if(excludeBookingId)bookingFilter._id={$ne:excludeBookingId};
  const bookingsQuery=Booking.find(bookingFilter);
  const blocksQuery=BlockedDate.find({roomTypeId,date:{$gte:startDate,$lt:endDate}});
  if(session){bookingsQuery.session(session);blocksQuery.session(session);}
  const [bookings,blocks]=await Promise.all([bookingsQuery.lean(),blocksQuery.lean()]);
  const blocked=new Set(blocks.map(b=>new Date(b.date).toISOString().slice(0,10)));
  const daily=nights(startDate,endDate).map(date=>{
    const key=date.toISOString().slice(0,10);
    const booked=bookings.filter(b=>new Date(b.checkIn)<new Date(date.getTime()+86400000)&&new Date(b.checkOut)>date).reduce((sum,b)=>sum+b.numRooms,0);
    const isBlocked=blocked.has(key);
    return {date:key,bookedUnits:booked,remainingUnits:Math.max(0,room.totalUnits-booked),available:!isBlocked&&booked<room.totalUnits};
  });
  return {available:daily.every(d=>d.available),remainingUnits:Math.min(...daily.map(d=>d.remainingUnits)),daily};
}
