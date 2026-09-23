import Link from 'next/link'; import {ArrowRight,ArrowUpRight} from 'lucide-react'; import {assetImages} from '@/lib/assets'; import AssetImage from '@/components/AssetImage'; import SignatureHero from '@/components/SignatureHero'; import {site} from '@/lib/config';
export default function Home(){const standard=assetImages('rooms/standard-twin');const king=assetImages('rooms/standard-king');const deluxe=assetImages('rooms/deluxe');const hero=standard[0]||deluxe[0];return <><SignatureHero image={hero}/>
<section className="mx-auto grid max-w-[90rem] gap-12 px-5 py-24 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-36"><div><p className="text-sm font-medium text-[#a75536]">A family place, since the beginning</p><p className="mt-5 max-w-sm text-2xl font-semibold leading-9 tracking-[-0.025em] text-forest-950">Tiffin began as a restaurant more than two decades ago.</p></div><div><h2 className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-stone-900 sm:text-5xl">It grew naturally into a small lodge, while staying what it always was: personal, welcoming and centred around food.</h2><div className="mt-10 grid gap-7 border-t border-stone-300 pt-7 sm:grid-cols-3"><div><strong className="text-3xl font-semibold text-forest-800">20+</strong><p className="mt-2 text-sm leading-6 text-stone-500">years in Sauraha</p></div><div><strong className="text-3xl font-semibold text-forest-800">10</strong><p className="mt-2 text-sm leading-6 text-stone-500">standard and deluxe rooms</p></div><div><strong className="text-3xl font-semibold text-forest-800">10 min</strong><p className="mt-2 text-sm leading-6 text-stone-500">walk to the Rapti River</p></div></div></div></section>
<section className="bg-[#efe6d7] py-24 lg:py-32">
  <div className="mx-auto max-w-[90rem] px-5 lg:px-10">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-[#a75536]">Stay at Tiffin</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.04em] text-forest-950 sm:text-5xl">A comfortable base for days outside.</h2>
      </div>
      <Link href="/rooms" className="link-action shrink-0 text-sm font-semibold text-forest-800 hover:text-forest-600">See every room <ArrowRight size={17}/></Link>
    </div>

    <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-8">
      <Link href="/rooms/standard-twin" className="group flex flex-col lg:col-span-7">
        <div className="aspect-[16/10] overflow-hidden rounded-[2rem_5rem_2rem_2rem] bg-stone-200">
          <AssetImage src={standard[0]} alt="Standard Twin or Double room" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"/>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-forest-700">Standard Twin / Double</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">One single and one double bed · 1–3 guests</p>
          </div>
          <span className="link-action text-sm font-semibold text-forest-800 group-hover:text-forest-600">View room <ArrowRight size={16} className="group-hover:translate-x-1"/></span>
        </div>
      </Link>

      <div className="grid gap-10 lg:col-span-5 lg:grid-rows-2 lg:gap-8">
        <Link href="/rooms/standard-king" className="group grid gap-5 sm:grid-cols-[1.05fr_.95fr] sm:items-center lg:h-full">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem_1.5rem_1.5rem_4rem] bg-stone-200 lg:h-full lg:aspect-auto">
            <AssetImage src={king[1]||king[0]} alt="Standard King room" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"/>
          </div>
          <div className="flex min-w-0 flex-col items-start justify-center py-2">
            <h3 className="text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-forest-700">Standard King</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">One king-size bed · 1–2 guests</p>
            <span className="link-action mt-5 text-sm font-semibold text-forest-800 group-hover:text-forest-600">View room <ArrowRight size={15} className="group-hover:translate-x-1"/></span>
          </div>
        </Link>

        <Link href="/rooms/deluxe" className="group grid gap-5 sm:grid-cols-[1.05fr_.95fr] sm:items-center lg:h-full">
          <div className="aspect-[4/3] overflow-hidden rounded-[4rem_1.5rem_1.5rem_1.5rem] bg-stone-200 lg:h-full lg:aspect-auto">
            <AssetImage src={deluxe[0]} alt="Deluxe room" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"/>
          </div>
          <div className="flex min-w-0 flex-col items-start justify-center py-2">
            <h3 className="text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-forest-700">Deluxe Room</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">A little more room · couples and families</p>
            <span className="link-action mt-5 text-sm font-semibold text-forest-800 group-hover:text-forest-600">View room <ArrowRight size={15} className="group-hover:translate-x-1"/></span>
          </div>
        </Link>
      </div>
    </div>
  </div>
</section>
<section className="bg-[#b96343] text-white"><div className="mx-auto grid max-w-[90rem] lg:grid-cols-2"><div className="aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[680px]">{deluxe[1]&&<AssetImage src={deluxe[1]} alt="A room at Tiffin Home" className="h-full w-full object-cover"/>}</div><div className="flex items-center px-5 py-20 sm:px-8 lg:px-16"><div className="max-w-xl"><p className="text-sm font-medium text-orange-100">The Tiffin story</p><h2 className="mt-5 text-4xl font-bold leading-[1.12] tracking-[-0.04em] sm:text-5xl">A restaurant first. A lodge later. A family business throughout.</h2><p className="mt-7 text-[17px] leading-8 text-orange-50/85">The property now has 10 rooms, but the purpose has stayed simple: comfortable accommodation, freshly prepared food and a warm, personal experience while guests explore Chitwan.</p><Link href="/story" className="btn-light mt-8">Read our story <ArrowRight size={16}/></Link></div></div></div></section>
<section className="mx-auto grid max-w-[90rem] gap-14 px-5 py-24 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-36"><div className="lg:py-8"><p className="text-sm font-medium text-[#a75536]">From the kitchen</p><h2 className="mt-4 text-4xl font-bold leading-[1.12] tracking-[-0.04em] sm:text-5xl">Meals are made when you order them.</h2><p className="mt-6 max-w-lg text-[17px] leading-8 text-stone-600">Breakfast before a safari, something warm after a jungle walk, or an easy dinner at the end of the day. The restaurant is open daily from 8:00 AM to 10:00 PM.</p><Link href="/restaurant" className="mt-8 inline-flex items-center gap-2 border-b border-forest-700 pb-1 text-sm font-semibold text-forest-800">Read the menu <ArrowRight size={16}/></Link></div><div className="grid grid-cols-[1.25fr_.75fr] gap-4"><div className="aspect-[4/5] overflow-hidden rounded-[2rem_2rem_7rem_2rem]">{standard[2]&&<AssetImage src={standard[2]} alt="Tiffin Home room" className="h-full w-full object-cover"/>}</div><div className="flex flex-col justify-end rounded-[6rem_2rem_2rem_2rem] bg-forest-800 p-7 text-white"><p className="text-4xl font-semibold">8–10</p><p className="mt-2 text-sm leading-6 text-forest-100/75">Restaurant hours, every day</p></div></div></section>
<section className="border-y border-forest-900/10 bg-forest-50/70"><div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><p className="text-sm font-medium text-[#a75536]">Around Sauraha</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-forest-950">Wildlife, river and village life are close by.</h2></div><div className="grid gap-x-10 sm:grid-cols-2">{['Jungle and jeep safaris','Canoeing and bird watching','Tharu cultural experiences','Rapti River sunsets'].map(item=><Link href="/tours" key={item} className="group flex items-center justify-between border-b border-forest-900/15 py-5 text-base font-medium text-forest-950 transition-colors duration-300 hover:border-forest-600 hover:text-forest-700"><span>{item}</span><ArrowUpRight size={17} className="text-forest-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>)}</div></div></div></section>
<section className="px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-8 rounded-[2rem_5rem_2rem_2rem] bg-forest-800 px-7 py-12 text-white sm:flex-row sm:items-center sm:px-12"><div><p className="text-sm font-medium text-forest-200">Planning a stay in Sauraha?</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">Choose your room and send a reservation request.</h2></div><Link href="/rooms" className="btn-warm shrink-0">Check the rooms</Link></div></section>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'LodgingBusiness',name:site.name,address:{'@type':'PostalAddress',addressLocality:'Sauraha',addressRegion:'Chitwan',addressCountry:'NP'},telephone:site.phone,email:site.email})}}/></>}
