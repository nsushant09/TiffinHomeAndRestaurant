import mongoose from 'mongoose';
import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {dbConnect} from '@/lib/mongodb';
import BlockedDate from '@/models/BlockedDate';
import Booking from '@/models/Booking';
import RoomType from '@/models/RoomType';
import {requireAdmin,adminError} from '@/lib/admin';

const schema=z.object({roomTypeId:z.string().min(1),date:z.string().date(),reason:z.string().max(200).optional()});
export async function GET(){try{await requireAdmin();await dbConnect();return NextResponse.json(await BlockedDate.find().populate('roomTypeId','name').sort({date:1}).limit(500).lean());}catch(e){return adminError(e);}}
export async function POST(req:NextRequest){try{await requireAdmin();const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:'Invalid blocked date'},{status:400});await dbConnect();const date=new Date(`${p.data.date}T00:00:00Z`);const session=await mongoose.startSession();let block:any;try{await session.withTransaction(async()=>{const room=await RoomType.findByIdAndUpdate(p.data.roomTypeId,{$inc:{bookingRevision:1}},{new:true,session});if(!room)throw new Error('ROOM_TYPE_NOT_FOUND');const hasBooking=await Booking.exists({roomTypeId:p.data.roomTypeId,status:{$in:['pending','confirmed','checked_in']},checkIn:{$lt:new Date(date.getTime()+86400000)},checkOut:{$gt:date}}).session(session);if(hasBooking)throw new Error('DATE_HAS_BOOKING');block=await BlockedDate.create([{roomTypeId:p.data.roomTypeId,date,reason:p.data.reason}],{session});});}finally{await session.endSession();}return NextResponse.json(block[0],{status:201});}catch(e){if(e instanceof Error&&e.message==='DATE_HAS_BOOKING')return NextResponse.json({error:'This date has an active reservation and cannot be blocked.'},{status:409});if(e instanceof Error&&e.message==='ROOM_TYPE_NOT_FOUND')return NextResponse.json({error:'Room type not found'},{status:404});return adminError(e);}}
export async function DELETE(req:NextRequest){try{await requireAdmin();const id=req.nextUrl.searchParams.get('id');if(!id)return NextResponse.json({error:'id is required'},{status:400});await dbConnect();await BlockedDate.findByIdAndDelete(id);return NextResponse.json({ok:true});}catch(e){return adminError(e);}}
