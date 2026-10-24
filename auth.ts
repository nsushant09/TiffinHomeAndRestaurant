import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {dbConnect} from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import {rateLimit} from '@/lib/rate-limit';

export const authOptions:NextAuthOptions={
  providers:[CredentialsProvider({
    name:'Credentials',
    credentials:{email:{label:'Email',type:'email'},password:{label:'Password',type:'password'}},
    async authorize(credentials,req){
      if(!credentials?.email||!credentials.password)return null;
      await dbConnect();
      const headers=req?.headers as Record<string,string|undefined>|undefined;
      const address=headers?.['cf-connecting-ip']||headers?.['x-real-ip']||'unknown';
      if(!await rateLimit(`admin-login:${address}`,8,15*60_000))return null;
      const user=await AdminUser.findOne({email:credentials.email.toLowerCase()});
      if(!user||!(await bcrypt.compare(credentials.password,user.passwordHash)))return null;
      return {id:user._id.toString(),name:user.name,email:user.email,role:user.role};
    },
  })],
  // Fail closed when production secrets are missing; never sign sessions with a public fallback.
  secret: process.env.NEXTAUTH_SECRET,
  session:{strategy:'jwt'},
  callbacks:{
    async jwt({token,user}){if(user){token.id=user.id;token.role=(user as any).role;}return token;},
    async session({session,token}){session.user={...session.user,id:token.id as string,role:token.role as string};return session;},
  },
};
