import BookingSuccess from '@/components/BookingSuccess';
export default async function Confirmation({searchParams}:{searchParams:Promise<{reference?:string}>}){const {reference}=await searchParams;return <BookingSuccess reference={reference||'TBD'}/>}
