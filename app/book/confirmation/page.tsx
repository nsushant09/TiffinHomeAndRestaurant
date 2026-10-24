import BookingSuccess from '@/components/BookingSuccess';
export default async function Confirmation({searchParams}:{searchParams:Promise<{reference?:string;email?:string}>}){const {reference,email}=await searchParams;return <BookingSuccess reference={reference||'Unavailable'} emailFailed={email==='failed'}/>}
