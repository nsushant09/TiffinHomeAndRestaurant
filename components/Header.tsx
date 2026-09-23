'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  ['Rooms', '/rooms'],
  ['Restaurant', '/restaurant'],
  ['Experiences', '/tours'],
  ['Our story', '/story'],
  ['Contact', '/location'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const reduced = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-forest-950/10 bg-[#fbf8f1]/95 backdrop-blur-xl">
      <div className="mx-auto grid h-[4.75rem] max-w-[90rem] grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link
          href="/"
          className="group flex w-fit items-center"
          onClick={() => setOpen(false)}
          aria-label="Tiffin Home and Restaurant, home page"
        >
          <span className="relative h-12 w-12 shrink-0">
            <Image
              src="/images/logo/tiffin-mark.png"
              alt=""
              fill
              sizes="48px"
              className="object-contain transition-transform duration-300 ease-out group-hover:rotate-[-3deg] group-hover:scale-105"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`group relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-forest-700 after:transition-transform after:duration-300 ${
                path === href ? 'text-forest-800 after:scale-x-0' : 'text-stone-600 after:scale-x-0 hover:text-forest-800 hover:after:scale-x-100'
              }`}
            >
              {label}
              {path === href && (
                <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-0.5 h-px bg-forest-700" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              href="/rooms"
              className="btn-primary hidden !px-5 !py-3 sm:flex"
            >
              Book a stay <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(!open)}
            className="icon-control grid h-11 w-11 place-items-center rounded-full border border-forest-950/15 text-forest-950 transition-colors duration-300 hover:border-forest-700 hover:bg-forest-700 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-600/15 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-forest-950/10 bg-[#fbf8f1] lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto grid max-w-[90rem] gap-1 px-5 py-5">
              {links.map(([label, href], index) => (
                <motion.div
                  key={href}
                  initial={reduced ? false : { x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-stone-200/80 px-1 py-3.5 text-lg font-medium text-stone-800 transition-colors duration-300 hover:border-forest-400 hover:pl-2 hover:text-forest-700"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/faq" onClick={() => setOpen(false)} className="px-1 py-3.5 text-lg font-medium text-stone-800 transition-all duration-300 hover:pl-2 hover:text-forest-700">
                FAQ
              </Link>
              <Link
                href="/rooms"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 sm:hidden"
              >
                Book a stay <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
