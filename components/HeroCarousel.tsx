'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bed, UtensilsCrossed, Package } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
}

const INTERVAL = 6000;

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();
  const total = images.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, total]);

  return (
    <section
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Background images carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={reduced ? { opacity: 0.6 } : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          {images[current] && (
            <Image
              src={images[current]}
              alt="Tiffin Home and Restaurant"
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-forest-950/70 via-forest-950/50 to-forest-950/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[90rem] flex-col items-center px-5 text-center text-white">
        {/* Main headline */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.96] tracking-[-0.04em]"
        >
          Namaste &amp; Welcome to
          <br />
          <span className="bg-gradient-to-r from-forest-300 via-forest-200 to-emerald-300 bg-clip-text text-transparent">
            Tiffin Home
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-white/85 sm:text-xl"
        >
          What can we offer you?
        </motion.p>

        {/* Service cards */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.88 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/rooms"
            className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-forest-400/40 hover:bg-forest-900/30 hover:shadow-lg hover:shadow-forest-900/20"
          >
            <span className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125">
              <Bed size={22} className="shrink-0 text-forest-300 transition-colors duration-300 group-hover:text-emerald-300" />
            </span>
            <span className="text-sm font-semibold">Room</span>
          </Link>
          <Link
            href="/packages"
            className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-forest-400/40 hover:bg-forest-900/30 hover:shadow-lg hover:shadow-forest-900/20"
          >
            <span className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125">
              <Package size={22} className="shrink-0 text-forest-300 transition-colors duration-300 group-hover:text-emerald-300" />
            </span>
            <span className="text-sm font-semibold">Package</span>
          </Link>
          <Link
            href="/restaurant"
            className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-forest-400/40 hover:bg-forest-900/30 hover:shadow-lg hover:shadow-forest-900/20"
          >
            <span className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-125">
              <UtensilsCrossed size={22} className="shrink-0 text-forest-300 transition-colors duration-300 group-hover:text-emerald-300" />
            </span>
            <span className="text-sm font-semibold">Restaurant</span>
          </Link>
        </motion.div>

        {/* Reserve Now CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 1.05 }}
          className="mt-10"
        >
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-forest-950/40 transition-all duration-300 hover:bg-forest-500 hover:shadow-xl hover:shadow-forest-600/30 active:scale-[.97]"
          >
            Reserve Now <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Carousel indicators */}
        {total > 1 && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center gap-2"
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-white/50">SCROLL</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
