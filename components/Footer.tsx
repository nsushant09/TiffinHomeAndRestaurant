'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/config';

const footerLink =
  'group flex w-fit items-center gap-2 text-sm text-forest-100/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white';

export default function Footer() {
  const pathname = usePathname();

  // On the home page, the footer is embedded inside the full-screen layout
  if (pathname === '/') {
    return null;
  }

  return (
    <footer className="overflow-hidden bg-forest-950 text-white">
      <div className="mx-auto max-w-[90rem] px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[.65fr_1.35fr] lg:items-end lg:pb-16">
          <Link href="/" aria-label="Tiffin Home and Restaurant, home page" className="group w-fit">
            <span className="relative block h-20 w-20 sm:h-24 sm:w-24">
              <Image
                src="/images/logo/tiffin-mark.png"
                alt=""
                fill
                sizes="96px"
                className="object-contain brightness-0 invert transition-transform duration-500 ease-out group-hover:rotate-[-3deg] group-hover:scale-105"
              />
            </span>
          </Link>
          <div className="lg:justify-self-end">
            <p className="max-w-3xl text-3xl font-semibold leading-[1.25] tracking-[-0.035em] text-white sm:text-4xl">
              A family-run place to sleep, eat and begin exploring Sauraha and Chitwan.
            </p>
            <Link href="/rooms" className="btn-light mt-7">
              Find your room <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-300">Stay &amp; eat</p>
            <div className="mt-5 space-y-3">
              <Link href="/rooms" className={footerLink}>Accommodation</Link>
              <Link href="/restaurant" className={footerLink}>Restaurant &amp; menu</Link>
              <Link href="/rooms" className={footerLink}>Room tariffs</Link>
              <Link href="/packages" className={footerLink}>Holiday packages</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-300">Explore</p>
            <div className="mt-5 space-y-3">
              <Link href="/tours" className={footerLink}>Wildlife &amp; safaris</Link>
              <Link href="/gallery" className={footerLink}>Photo gallery</Link>
              <Link href="/story" className={footerLink}>Our story</Link>
              <Link href="/faq" className={footerLink}>Guest FAQ</Link>
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-300">Contact us</p>
            <div className="mt-5 grid gap-4 text-sm text-forest-100/75 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="mt-1 leading-6">{site.location}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Direct communication</p>
                <p className="mt-1 leading-6">
                  <a href={`tel:${site.phone}`} className="hover:text-white">{site.phone}</a><br />
                  <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-forest-100/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Genuine Nepali hospitality on the edge of Chitwan National Park.</p>
        </div>
      </div>
    </footer>
  );
}
