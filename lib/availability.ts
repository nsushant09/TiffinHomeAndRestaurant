import Booking from '@/models/Booking';
import BlockedDate from '@/models/BlockedDate';
import RoomType from '@/models/RoomType';
import { nights } from './dates';

export async function getAvailability(roomTypeId:string,startDate:Date,endDate:Date) {
  const room:any=await RoomType.findById(roomTypeId).lean();
  if(!room) throw new Error('Room type not found');
  const bookings=await Booking.find({roomTypeId,status:{$in:['pending','confirmed','checked_in']},checkIn:{$lt:endDate},checkOut:{$gt:startDate}}).lean();
  const blocks=await BlockedDate.find({roomTypeId,date:{$gte:startDate,$lt:endDate}}).lean();
  const blocked=new Set(blocks.map(b=>new Date(b.date).toISOString().slice(0,10)));
  const daily=nights(startDate,endDate).map(date=>{
    const key=date.toISOString().slice(0,10);
    const booked=bookings.filter(b=>new Date(b.checkIn)<new Date(date.getTime()+86400000)&&new Date(b.checkOut)>date).reduce((sum,b)=>sum+b.numRooms,0);
    const isBlocked=blocked.has(key);
    return {date:key,bookedUnits:booked,remainingUnits:Math.max(0,room.totalUnits-booked),available:!isBlocked&&booked<room.totalUnits};
  });
  return {available:daily.every(d=>d.available),remainingUnits:Math.min(...daily.map(d=>d.remainingUnits)),daily};
}
