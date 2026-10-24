import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {dbConnect} from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import {rateLimit} from '@/lib/rate-limit';
import {sendEnquiryNotification} from '@/lib/email';
import {requireAdmin,adminError} from '@/lib/admin';

const schema=z.object({type:z.enum(['tour','general']),fullName:z.string().trim().min(2).max(100),email:z.string().email(),phone:z.string().max(30).optional(),message:z.string().trim().min(5).max(2000),activityInterest:z.string().max(100).optional(),preferredDates:z.object({start:z.string().date(),end:z.string().date()}).optional()});

export async function GET(){try{await requireAdmin();await dbConnect();return NextResponse.json(await Enquiry.find().sort({createdAt:-1}).limit(200).lean());}catch(e){return adminError(e);}}

export async function POST(req:NextRequest){
  const p=schema.safeParse(await req.json().catch(()=>null));
  if(!p.success)return NextResponse.json({error:'Invalid enquiry',details:p.error.flatten()},{status:400});
  try{
    await dbConnect();
    const address=req.headers.get('cf-connecting-ip')||'unknown';
    if(!await rateLimit(`enquiry:${address}`))return NextResponse.json({error:'Too many requests'},{status:429});
    const d=p.data;
    const enquiry=await Enquiry.create({...d,preferredDates:d.preferredDates?{start:new Date(`${d.preferredDates.start}T00:00:00Z`),end:new Date(`${d.preferredDates.end}T00:00:00Z`)}:undefined,emailStatus:'pending'});
    const dates=d.preferredDates?{start:new Date(`${d.preferredDates.start}T00:00:00Z`),end:new Date(`${d.preferredDates.end}T00:00:00Z`)}:undefined;
    let emailSent=true;
    try{await sendEnquiryNotification({...d,preferredDates:dates});await Enquiry.updateOne({_id:enquiry._id},{$set:{emailStatus:'sent'}});}
    catch{emailSent=false;await Enquiry.updateOne({_id:enquiry._id},{$set:{emailStatus:'failed'}});}
    return NextResponse.json({id:enquiry._id,emailSent},{status:201});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not submit enquiry'},{status:500});}
}
