import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Bed,
  Wifi,
  Droplets,
  Wind,
  Coffee,
  Star,
  Clock,
  Check,
  Bus,
  ShieldCheck,
  Sun,
  Compass,
  Phone,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { assetImages } from '@/lib/assets';
import AssetImage from '@/components/AssetImage';
import HeroCarousel from '@/components/HeroCarousel';
import { site } from '@/lib/config';

export default function Home() {
  const standard = assetImages('rooms/standard-twin');
  const king = assetImages('rooms/standard-king');
  const deluxe = assetImages('rooms/deluxe');
  const experiences = assetImages('experiences');

  // Collect available images for the hero carousel (up to 5)
  const heroImages = [
    ...standard,
    ...king,
    ...deluxe,
    ...experiences,
  ].slice(0, 5);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: Hero Carousel — full viewport */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <HeroCarousel images={heroImages} />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2: About / Description */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#fbf8f1] py-16 lg:py-24">
        {/* Decorative background circles */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-forest-100/50" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-[400px] w-[400px] rounded-full bg-forest-100/40" />

        <div className="relative z-10 mx-auto grid max-w-[90rem] gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-700">
              Our Story
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-forest-950 sm:text-5xl lg:text-6xl">
              A family place,{' '}
              <span className="bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                since the beginning
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-8 text-stone-600">
              <p>
                At Tiffin Home and Restaurant, we believe every stay should feel comfortable, welcoming, and memorable. As a family-run business with more than 20 years of hospitality experience, we&apos;re proud to offer genuine Nepali hospitality, comfortable accommodation, and delicious home-style meals.
              </p>
              <p>
                Our double and triple rooms feature comfortable beds, private bathrooms, hot water, air conditioning, fans, balconies, natural light, and 24-hour electricity. Enjoy the convenience of complimentary Wi-Fi, free bottled drinking water, a welcome drink, and in-room coffee and tea.
              </p>
              <p>
                Located just a short walk from the beautiful Rapti River, we&apos;re the perfect base for relaxing, exploring nature, and discovering the wonders of Chitwan. We also help arrange exciting local activities and wildlife adventures, including jungle safaris.
              </p>
            </div>
            <Link
              href="/story"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest-700 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-forest-800 hover:shadow-lg hover:shadow-forest-900/15 active:scale-[.97]"
            >
              Read our full story <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Bed size={24} />, label: 'Comfortable beds', detail: 'Double & triple rooms' },
              { icon: <Wifi size={24} />, label: 'Free Wi-Fi', detail: 'Complimentary access' },
              { icon: <Droplets size={24} />, label: 'Hot water', detail: 'Private bathrooms' },
              { icon: <Wind size={24} />, label: 'Air conditioning', detail: 'AC & fan in every room' },
              { icon: <Coffee size={24} />, label: 'Welcome drink', detail: 'In-room tea & coffee' },
              { icon: <Star size={24} />, label: '18+ years', detail: 'Hospitality experience' },
            ].map((amenity) => (
              <div
                key={amenity.label}
                className="group rounded-2xl border border-forest-900/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-forest-600/20 hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  {amenity.icon}
                </div>
                <p className="mt-3 text-sm font-semibold text-forest-950">{amenity.label}</p>
                <p className="mt-1 text-xs text-stone-500">{amenity.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3: Accommodation */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#efe6d7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem] px-5 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-forest-700">Stay at Tiffin</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.04em] text-forest-950 sm:text-5xl">
                Your comfortable base in Sauraha.
              </h2>
            </div>
            <Link href="/rooms" className="link-action shrink-0 text-sm font-semibold text-forest-800 hover:text-forest-600">
              See all rooms <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Deluxe Couple Room */}
            <Link href="/rooms/deluxe" className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-card">
              <div className="aspect-[16/10] overflow-hidden">
                <AssetImage
                  src={deluxe[0] || standard[0]}
                  alt="Deluxe Couple Room"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-tight text-forest-950 transition-colors group-hover:text-forest-700">
                  Deluxe Couple Room
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">2 adults · 1 king size bed · AC &amp; balcony</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['AC', 'Balcony', 'Free Wi-Fi', 'Marble bathroom'].map((tag) => (
                    <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <span className="link-action text-sm font-semibold text-forest-800 group-hover:text-forest-600">
                    View room <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Deluxe Family Room */}
            <Link href="/rooms/standard-king" className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-card">
              <div className="aspect-[16/10] overflow-hidden">
                <AssetImage
                  src={king[0] || standard[0]}
                  alt="Deluxe Family Room"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-tight text-forest-950 transition-colors group-hover:text-forest-700">
                  Deluxe Family Room
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">2 adults + 1 child · 1 king + 1 single · AC</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['AC', 'Free Wi-Fi', 'Marble bathroom', 'Tea & coffee'].map((tag) => (
                    <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <span className="link-action text-sm font-semibold text-forest-800 group-hover:text-forest-600">
                    View room <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Super Deluxe Family Room */}
            <Link href="/rooms/standard-twin" className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-card">
              <div className="aspect-[16/10] overflow-hidden">
                <AssetImage
                  src={standard[0]}
                  alt="Super Deluxe Family Room"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-tight text-forest-950 transition-colors group-hover:text-forest-700">
                  Super Deluxe Family Room
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">2 adults + 1 child · Spacious layout · Balcony</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['AC', 'Balcony', 'Free Wi-Fi', 'Wardrobe', 'Spacious'].map((tag) => (
                    <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <span className="link-action text-sm font-semibold text-forest-800 group-hover:text-forest-600">
                    View room <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 4: Activities */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-forest-950 text-white py-16 lg:py-24">
        {experiences[0] && (
          <div className="absolute inset-0 z-0">
            <AssetImage src={experiences[0]} alt="" className="h-full w-full object-cover opacity-25" />
          </div>
        )}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-forest-950/90 via-forest-950/80 to-forest-950/60" />

        <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#d4a574]">
            Explore Chitwan
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Activities &amp; Wildlife Adventures
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            We help arrange exciting local activities and wildlife adventures. From thrilling safaris to peaceful river journeys.
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Elephant Safari', desc: 'Get up close with wildlife on elephant back' },
              { name: 'Jeep Safari', desc: 'Explore Chitwan National Park by 4x4' },
              { name: 'Jungle Walk', desc: 'Half day to multi-day treks through the jungle' },
              { name: 'Canoe Safari', desc: 'Glide down the Rapti River spotting wildlife' },
              { name: 'Bird Watching', desc: 'Over 500 species in the Chitwan region' },
              { name: 'Tharu Culture Show', desc: 'Experience authentic Tharu cultural performances' },
            ].map((activity) => (
              <Link
                key={activity.name}
                href="/tours"
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d4a574]/40 hover:bg-white/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4a574]/20 text-[#d4a574] transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-forest-950">
                  <ArrowUpRight size={20} />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight transition-colors group-hover:text-[#f4d3b6]">
                    {activity.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{activity.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-[#f4d3b6]">Jungle Walk Itineraries</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { day: 'Half day', desc: 'Up to Gaur Machan' },
                { day: 'Full day', desc: 'Up to Ghadghai' },
                { day: '2nd day', desc: 'Madi or Meghauli' },
                { day: '3rd day', desc: 'Jagatpur' },
              ].map(({ day, desc }) => (
                <div key={day} className="rounded-xl border border-white/8 bg-white/5 px-5 py-4">
                  <p className="text-sm font-semibold text-[#d4a574]">{day}</p>
                  <p className="mt-1 text-sm text-white/60">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/40">4th day: Back to Sauraha by walk or vehicle</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: Restaurant */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#f8f5ee] py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/restaurant/tiffin-dining.jpg"
              alt="Authentic Nepali dining at Tiffin Restaurant"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-200">Authentic recipes</p>
                <p className="text-lg font-bold">Traditional Dal Bhat &amp; Fresh Momos</p>
              </div>
              <span className="rounded-full bg-forest-700/80 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
                Made to order
              </span>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-700">
              Tiffin Restaurant
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-forest-950 sm:text-5xl">
              Home-style Nepali cooking, freshly prepared.
            </h2>
            <p className="mt-6 text-[17px] leading-8 text-stone-600">
              The restaurant is where our family journey began more than 20 years ago in Sauraha. Enjoy comforting Nepali Dal Bhat, steamed Himalayan momos, hearty breakfasts before safaris, and freshly brewed masala chai.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-forest-700">
                  <Clock size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Hours</span>
                </div>
                <p className="mt-2 text-xl font-bold text-forest-950">8 AM – 10 PM</p>
                <p className="mt-0.5 text-xs text-stone-500">Open 7 days a week</p>
              </div>
              <div className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-forest-700">
                  <Coffee size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Breakfast</span>
                </div>
                <p className="mt-2 text-xl font-bold text-forest-950">Daily &amp; Fresh</p>
                <p className="mt-0.5 text-xs text-stone-500">Included with stays</p>
              </div>
            </div>

            <div className="mt-9">
              <Link href="/restaurant" className="btn-primary">
                Explore the menu <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: Tariff — Redone from Scratch */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#fbf8f1] py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-forest-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#efe6d7]/60 blur-3xl" />

        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col justify-center px-5 lg:px-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-forest-800">
              <Sparkles size={13} className="text-forest-600" />
              Room Tariff &amp; Inclusions
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-forest-950 sm:text-4xl lg:text-5xl">
              Transparent rates,{' '}
              <span className="bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                warm hospitality included.
              </span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              All bookings include daily homemade breakfast, 24/7 hot showers, high-speed Wi-Fi, and complimentary pickup from the Sauraha tourist bus park.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-forest-900">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-sm">
                <Coffee size={13} className="text-forest-700" /> Daily Breakfast Included
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-sm">
                <Bus size={13} className="text-forest-700" /> Free Bus Park Pickup
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-sm">
                <Droplets size={13} className="text-forest-700" /> 24/7 Solar Hot Water
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-sm">
                <Wifi size={13} className="text-forest-700" /> Free Fibre Wi-Fi
              </span>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Deluxe Couple */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <AssetImage
                  src={deluxe[0] || standard[0]}
                  alt="Deluxe Couple Room"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  Couples &amp; Solos
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-forest-950">Deluxe Couple</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                  <Bed size={13} className="text-forest-600" /> 1 King bed · Private balcony
                </p>

                <div className="mt-4 rounded-2xl bg-forest-50/70 p-3">
                  <div className="flex items-baseline justify-between border-b border-forest-200/60 pb-1.5">
                    <span className="text-xs text-stone-600">Single occupancy</span>
                    <span className="text-base font-bold text-forest-900">$20 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1.5">
                    <span className="text-xs text-stone-600">Double occupancy</span>
                    <span className="text-base font-bold text-forest-900">$23 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                </div>

                <ul className="mt-3.5 space-y-1.5 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Air conditioning &amp; fan
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Ensuite marble bathroom
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Breakfast &amp; Wi-Fi included
                  </li>
                </ul>

                <div className="mt-auto pt-4">
                  <Link
                    href="/rooms/deluxe"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-700 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-forest-800"
                  >
                    Reserve Room <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Deluxe Family */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <AssetImage
                  src={king[0] || standard[0]}
                  alt="Deluxe Family Room"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  Family Favorite
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-forest-950">Deluxe Family</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                  <Bed size={13} className="text-forest-600" /> 1 King + 1 Single bed
                </p>

                <div className="mt-4 rounded-2xl bg-forest-50/70 p-3">
                  <div className="flex items-baseline justify-between border-b border-forest-200/60 pb-1.5">
                    <span className="text-xs text-stone-600">2 adults</span>
                    <span className="text-base font-bold text-forest-900">$27 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1.5">
                    <span className="text-xs text-stone-600">3 guests</span>
                    <span className="text-base font-bold text-forest-900">$30 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                </div>

                <ul className="mt-3.5 space-y-1.5 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Air conditioning &amp; fan
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> In-room tea &amp; coffee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Breakfast &amp; Wi-Fi included
                  </li>
                </ul>

                <div className="mt-auto pt-4">
                  <Link
                    href="/rooms/standard-king"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-700 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-forest-800"
                  >
                    Reserve Room <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Super Deluxe Family */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-forest-600/30 bg-gradient-to-b from-forest-50/80 to-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <AssetImage
                  src={standard[0]}
                  alt="Super Deluxe Family Room"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-700 px-3 py-1 text-[11px] font-semibold text-white shadow-xs backdrop-blur-md">
                  Most Popular · Spacious
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-forest-950">Super Deluxe Family</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                  <Bed size={13} className="text-forest-600" /> 1 King + 1 Single · Dual balconies
                </p>

                <div className="mt-4 rounded-2xl bg-white p-3 border border-forest-200/60 shadow-xs">
                  <div className="flex items-baseline justify-between border-b border-forest-100 pb-1.5">
                    <span className="text-xs text-stone-600">2 adults</span>
                    <span className="text-base font-bold text-forest-900">$30 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1.5">
                    <span className="text-xs text-stone-600">3 adults</span>
                    <span className="text-base font-bold text-forest-900">$33 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                </div>

                <ul className="mt-3.5 space-y-1.5 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Largest room layout &amp; wardrobe
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Dual balconies &amp; garden view
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Breakfast &amp; Wi-Fi included
                  </li>
                </ul>

                <div className="mt-auto pt-4">
                  <Link
                    href="/rooms/standard-twin"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-700 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-forest-800"
                  >
                    Reserve Room <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Honeymoon Suite */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#d4a574]/40 bg-gradient-to-b from-[#fbf5ee] to-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <AssetImage
                  src={experiences[0] || deluxe[1] || deluxe[0]}
                  alt="Honeymoon Suite Celebration"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#d4a574] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                  Special Experience
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-forest-950">Honeymoon Suite</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[#b99464] font-medium">
                  <Sparkles size={13} className="text-[#d4a574]" /> Romantic decor &amp; celebration
                </p>

                <div className="mt-4 rounded-2xl bg-white p-3 border border-[#d4a574]/30 shadow-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-stone-600">Couple Package</span>
                    <span className="text-lg font-bold text-forest-900">$46 <span className="text-[11px] font-normal text-stone-500">/ night</span></span>
                  </div>
                </div>

                <ul className="mt-3.5 space-y-1.5 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Special celebratory heavy breakfast
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Floral room decoration &amp; fruit basket
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-forest-600 shrink-0" /> Welcome drink &amp; late checkout
                  </li>
                </ul>

                <div className="mt-auto pt-4">
                  <Link
                    href="/rooms/deluxe"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-900 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-forest-800"
                  >
                    Reserve Suite <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-stone-400">
            * All room rates include bed and breakfast. Prices are indicative USD conversions and converted to NPR upon check-in. No hidden booking fees.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 7: Planning your visit to Sauraha — Redone from Scratch */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-forest-950 text-white py-16 lg:py-24">
        {experiences[1] && (
          <div className="absolute inset-0 z-0">
            <AssetImage src={experiences[1]} alt="" className="h-full w-full object-cover opacity-15" />
          </div>
        )}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-forest-950/90 via-forest-950/80 to-forest-950/95" />

        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col justify-center px-5 lg:px-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4a574]/30 bg-[#d4a574]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#d4a574]">
              <Compass size={13} />
              Trip Planning · Gateway to Chitwan
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Planning your visit to Sauraha?{' '}
              <span className="text-[#f4d3b6]">
                We make it effortless.
              </span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              From complimentary bus station transfers to national park permits and expert-guided jungle safaris, our family takes care of every detail so you can immerse yourself in Chitwan&apos;s wildlife.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1: Getting Here */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d4a574]/40 hover:bg-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4a574]/20 text-[#d4a574] transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-forest-950">
                <Bus size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-[#f4d3b6] transition-colors">
                Getting Here &amp; Free Pickup
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Daily scenic tourist buses link Kathmandu and Pokhara (5–6 hrs). Bharatpur Airport is only 25 minutes away. We provide complimentary pickup from the Sauraha tourist bus terminal.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#f4d3b6]">
                <Check size={12} /> Free Bus Station Pickup
              </div>
            </div>

            {/* Pillar 2: Best Time to Visit */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d4a574]/40 hover:bg-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4a574]/20 text-[#d4a574] transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-forest-950">
                <Sun size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-[#f4d3b6] transition-colors">
                Best Wildlife Seasons
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                October to March offers mild, pleasant weather and migratory bird watching. April and May are peak months for Royal Bengal tigers, wild elephants, and rhinos near riverbanks.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#f4d3b6]">
                <Check size={12} /> Oct–May Peak Season
              </div>
            </div>

            {/* Pillar 3: Park Permits & Safaris */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d4a574]/40 hover:bg-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4a574]/20 text-[#d4a574] transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-forest-950">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-[#f4d3b6] transition-colors">
                Permits &amp; Safari Guides
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Skip queues and paper hassles. We directly organize official Chitwan National Park entry permits, licensed government nature guides, 4x4 open jeep safaris, and canoe river floats.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#f4d3b6]">
                <Check size={12} /> Full Safari Concierge
              </div>
            </div>

            {/* Pillar 4: Home-Style Care */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d4a574]/40 hover:bg-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4a574]/20 text-[#d4a574] transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-forest-950">
                <Star size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-[#f4d3b6] transition-colors">
                18+ Years Family Care
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Enjoy early packed breakfasts before dawn safaris, warm solar showers after dusty jungle treks, and comforting Nepali Dal Bhat when you return. Genuine hospitality since 2008.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#f4d3b6]">
                <Check size={12} /> Family-Run Warmth
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-forest-950/40 transition-all duration-300 hover:bg-forest-400 hover:shadow-xl active:scale-[.97]"
            >
              Browse Rooms &amp; Availability <ArrowRight size={17} />
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-forest-950 active:scale-[.97]"
            >
              Explore Safari Tours
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/40 bg-[#d4a574]/15 px-6 py-3.5 text-sm font-semibold text-[#f4d3b6] transition-all duration-300 hover:bg-[#d4a574] hover:text-forest-950 active:scale-[.97]"
            >
              <Phone size={16} /> Direct Call / WhatsApp: {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 8: Finale & Luxury Footer */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex w-full flex-col justify-between overflow-hidden bg-[#071c10] text-white pt-16">
        <div className="pointer-events-none absolute -right-36 -top-36 h-[500px] w-[500px] rounded-full bg-forest-800/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-forest-900/35 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 pt-12 pb-4 text-center lg:px-10 lg:pt-16 lg:pb-6">
          <div className="relative mx-auto mb-3 h-12 w-12">
            <Image
              src="/images/logo/tiffin-mark.png"
              alt="Tiffin Home"
              fill
              sizes="48px"
              className="object-contain brightness-0 invert opacity-90"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#d4a574]">
            Your sanctuary on the edge of the wild
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.035em] sm:text-3xl lg:text-4xl">
            We look forward to welcoming you to Sauraha.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-forest-100/70 sm:text-sm">
            More than 20 years of warm family hospitality. Clean comfortable rooms, authentic home-cooked meals, and wildlife adventures in Chitwan National Park.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-forest-100 transition-colors hover:border-white hover:text-white"
            >
              <Phone size={13} className="text-[#d4a574]" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-forest-100 transition-colors hover:border-white hover:text-white"
            >
              <Star size={13} className="text-[#d4a574]" /> {site.email}
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-forest-100">
              <MapPin size={13} className="text-[#d4a574]" /> {site.location}
            </span>
          </div>
        </div>

        <footer className="relative z-10 border-t border-white/10 bg-[#071c10]/90 pt-6 pb-6 backdrop-blur-md">
          <div className="mx-auto max-w-[90rem] px-5 lg:px-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 pb-6">
              <div className="space-y-4">
                <Link href="/" aria-label="Tiffin Home and Restaurant" className="group flex items-center gap-3">
                  <span className="relative block h-12 w-12 shrink-0">
                    <Image
                      src="/images/logo/tiffin-mark.png"
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                  <div>
                    <span className="block text-base font-bold tracking-tight">Tiffin Home</span>
                    <span className="block text-xs text-forest-200/70">&amp; Restaurant · Sauraha</span>
                  </div>
                </Link>
                <p className="text-xs leading-6 text-forest-100/60">
                  Comfortable accommodation, freshly prepared home-style food, and wildlife safari adventures in Chitwan, Nepal.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-forest-300">Stay &amp; Dine</h3>
                <div className="mt-3.5 grid gap-2 text-xs">
                  <Link href="/rooms" className="text-forest-100/70 transition-colors hover:text-white">Accommodation</Link>
                  <Link href="/restaurant" className="text-forest-100/70 transition-colors hover:text-white">Restaurant &amp; Menu</Link>
                  <Link href="/rooms" className="text-forest-100/70 transition-colors hover:text-white">Room Tariff &amp; Rates</Link>
                  <Link href="/packages" className="text-forest-100/70 transition-colors hover:text-white">Holiday Packages</Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-forest-300">Explore</h3>
                <div className="mt-3.5 grid gap-2 text-xs">
                  <Link href="/tours" className="text-forest-100/70 transition-colors hover:text-white">Wildlife &amp; Tours</Link>
                  <Link href="/gallery" className="text-forest-100/70 transition-colors hover:text-white">Photo Gallery</Link>
                  <Link href="/story" className="text-forest-100/70 transition-colors hover:text-white">Our 18-Year Story</Link>
                  <Link href="/faq" className="text-forest-100/70 transition-colors hover:text-white">Guest FAQ</Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-forest-300">Contact Us</h3>
                <div className="mt-3.5 grid gap-2 text-xs text-forest-100/70">
                  <a href={`tel:${site.phone}`} className="transition-colors hover:text-white">{site.phone}</a>
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">{site.email}</a>
                  <span>{site.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-forest-100/40 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
              <span>Genuine Nepali Hospitality in Chitwan National Park</span>
            </div>
          </div>
        </footer>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LodgingBusiness',
            name: site.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Sauraha',
              addressRegion: 'Chitwan',
              addressCountry: 'NP',
            },
            telephone: site.phone,
            email: site.email,
          }),
        }}
      />
    </>
  );
}
