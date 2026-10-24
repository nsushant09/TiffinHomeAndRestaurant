import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {dbConnect} from '@/lib/mongodb';
import Booking from '@/models/Booking';
import {requireAdmin,adminError} from '@/lib/admin';

const querySchema=z.object({status:z.enum(['pending','confirmed','cancelled','checked_in','checked_out','no_show']).optional(),roomTypeId:z.string().optional(),from:z.string().date().optional(),to:z.string().date().optional()});
export async function GET(req:NextRequest){try{await requireAdmin();const parsed=querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));if(!parsed.success)return NextResponse.json({error:'Invalid filters'},{status:400});await dbConnect();const q=parsed.data;const filter:any={};if(q.status)filter.status=q.status;if(q.roomTypeId)filter.roomTypeId=q.roomTypeId;if(q.from||q.to){const range:any={};if(q.from)range.$gt=new Date(`${q.from}T00:00:00Z`);if(q.to)range.$lt=new Date(new Date(`${q.to}T00:00:00Z`).getTime()+86400000);filter.checkOut=range;if(q.to)filter.checkIn={$lt:new Date(new Date(`${q.to}T00:00:00Z`).getTime()+86400000)};}return NextResponse.json(await Booking.find(filter).populate('roomTypeId','name').sort({checkIn:1}).limit(300).lean());}catch(e){return adminError(e);}}
