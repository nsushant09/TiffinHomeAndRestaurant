import mongoose,{Schema,models} from 'mongoose';

const schema=new Schema({key:{type:String,required:true,unique:true},count:{type:Number,required:true},resetAt:{type:Date,required:true,expires:0}},{versionKey:false});
export default models.RateLimit||mongoose.model('RateLimit',schema);
