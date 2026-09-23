import mongoose from 'mongoose'; import { requiredEnv } from './config';
const globalForMongoose = global as unknown as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };
const cached = globalForMongoose.mongoose ?? { conn:null, promise:null }; globalForMongoose.mongoose = cached;
export async function dbConnect() { if (cached.conn) return cached.conn; const uri=requiredEnv('MONGODB_URI'); const dbName=process.env.MONGODB_DB_NAME || 'tiffin-home'; if (!cached.promise) cached.promise=mongoose.connect(uri,{dbName}); cached.conn=await cached.promise; return cached.conn; }
