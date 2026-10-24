'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  ['Home', '/'],
  ['Accommodation', '/rooms'],
  ['Activities', '/tours'],
  ['Packages', '/packages'],
  ['Gallery', '/gallery'],
  ['About Us', '/story'],
  ['Contact Us', '/location'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const isHome = path === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Over the top of the dark hero carousel on homepage, use transparent light text;
  // when scrolled down or on other pages, use solid background with dark text
  const solidBg = !isHome || isScrolled;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[9999] transition-all duration-300 ${
        solidBg
          ? 'border-b border-forest-950/10 bg-[#fbf8f1]/95 shadow-soft backdrop-blur-xl'
          : isScrolled
          ? 'border-b border-white/10 bg-forest-950/90 shadow-soft backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
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
              className={`object-contain transition-all duration-300 ease-out group-hover:rotate-[-3deg] group-hover:scale-105 ${
                !solidBg ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`group relative py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                path === href
                  ? solidBg
                    ? 'text-forest-900 after:scale-x-0'
                    : 'text-white after:scale-x-0'
                  : solidBg
                  ? 'text-stone-800 after:scale-x-0 hover:text-forest-700 hover:after:scale-x-100'
                  : 'text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100'
              }`}
            >
              {label}
              {path === href && (
                <motion.span
                  layoutId="nav-active"
                  className={`absolute inset-x-0 -bottom-0.5 h-px ${
                    solidBg ? 'bg-forest-700' : 'bg-white'
                  }`}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              href="/rooms"
              className={`hidden !px-5 !py-3 sm:flex ${
                solidBg ? 'btn-primary' : 'btn-light'
              }`}
            >
              Book a stay <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(!open)}
            className={`icon-control grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 lg:hidden ${
              solidBg
                ? 'border-forest-950/15 text-forest-950 hover:border-forest-700 hover:bg-forest-700 hover:text-white focus-visible:ring-forest-600/15'
                : 'border-white/30 text-white hover:border-white hover:bg-white hover:text-forest-950 focus-visible:ring-white/20'
            }`}
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
            className={`overflow-hidden border-t lg:hidden ${
              solidBg
                ? 'border-forest-950/10 bg-[#fbf8f1]'
                : 'border-white/10 bg-forest-950 text-white'
            }`}
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
                    className={`block border-b px-1 py-3.5 text-lg font-medium transition-colors duration-300 ${
                      solidBg
                        ? 'border-stone-200/80 text-stone-800 hover:border-forest-400 hover:pl-2 hover:text-forest-700'
                        : 'border-white/10 text-white hover:border-white/40 hover:pl-2 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className={`px-1 py-3.5 text-lg font-medium transition-all duration-300 hover:pl-2 ${
                  solidBg
                    ? 'text-stone-800 hover:text-forest-700'
                    : 'text-white hover:text-white/80'
                }`}
              >
                FAQ
              </Link>
              <Link
                href="/rooms"
                onClick={() => setOpen(false)}
                className={`mt-3 sm:hidden ${
                  solidBg ? 'btn-primary' : 'btn-light'
                }`}
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
