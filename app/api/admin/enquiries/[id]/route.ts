import {NextResponse} from 'next/server';
import {dbConnect} from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import {sendEnquiryNotification} from '@/lib/email';
import {requireAdmin,adminError} from '@/lib/admin';

export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();await dbConnect();const {id}=await params;const enquiry=await Enquiry.findById(id);if(!enquiry)return NextResponse.json({error:'Enquiry not found'},{status:404});try{await sendEnquiryNotification(enquiry);await Enquiry.updateOne({_id:id},{$set:{emailStatus:'sent'}});return NextResponse.json({emailStatus:'sent'});}catch{await Enquiry.updateOne({_id:id},{$set:{emailStatus:'failed'}});return NextResponse.json({error:'Email delivery failed',emailStatus:'failed'},{status:502});}}catch(e){return adminError(e);}}
