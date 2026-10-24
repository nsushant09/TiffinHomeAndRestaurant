import RateLimit from '@/models/RateLimit';

// Shared MongoDB counter works across server instances. Call dbConnect() before this helper.
export async function rateLimit(key:string,limit=8,windowMs=60_000){
  const now=new Date();
  const active=await RateLimit.findOneAndUpdate({key,resetAt:{$gt:now},count:{$lt:limit}},{$inc:{count:1}},{new:true});
  if(active)return true;

  const expired=await RateLimit.updateOne({key,resetAt:{$lte:now}},{$set:{count:1,resetAt:new Date(now.getTime()+windowMs)}});
  if(expired.modifiedCount)return true;

  try{await RateLimit.create({key,count:1,resetAt:new Date(now.getTime()+windowMs)});return true;}
  catch(error){if(error&&typeof error==='object'&&'code'in error&&(error as {code:number}).code===11000)return false;throw error;}
}
