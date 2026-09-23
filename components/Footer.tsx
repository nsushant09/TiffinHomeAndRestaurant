import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/config';

const footerLink =
  'group flex w-fit items-center gap-2 text-sm text-forest-100/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white';

export default function Footer() {
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

        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-sm font-semibold text-forest-200">Explore</h2>
            <div className="mt-5 grid gap-3.5">
              <Link href="/rooms" className={footerLink}>Rooms <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
              <Link href="/restaurant" className={footerLink}>Restaurant <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
              <Link href="/tours" className={footerLink}>Experiences <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-forest-200">About</h2>
            <div className="mt-5 grid gap-3.5">
              <Link href="/story" className={footerLink}>Our story <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
              <Link href="/location" className={footerLink}>Location <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
              <Link href="/faq" className={footerLink}>FAQ <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-forest-200">Contact</h2>
            <div className="mt-5 grid gap-3.5 text-sm leading-6 text-forest-100/65">
              <a href={`mailto:${site.email}`} className="w-fit break-all transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white">{site.email}</a>
              <a href={`tel:${site.phone}`} className="w-fit transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white">{site.phone}</a>
              <span>{site.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-forest-100/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Family-run in Sauraha for more than 20 years</span>
        </div>
      </div>
    </footer>
  );
}
