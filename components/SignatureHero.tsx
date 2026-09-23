'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import AssetImage from './AssetImage';

export default function SignatureHero({ image }: { image?: string }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 22 });
  const x = useTransform(smoothX, [0, 1], [-9, 9]);
  const y = useTransform(smoothY, [0, 1], [-7, 7]);
  const ease = [0.22, 1, 0.36, 1] as const;

  function move(event: React.PointerEvent<HTMLElement>) {
    if (reduced) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width);
    pointerY.set((event.clientY - box.top) / box.height);
  }

  return (
    <section onPointerMove={move} className="relative overflow-hidden border-b border-forest-900/10">
      <div className="mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-[90rem] items-center gap-12 px-5 py-14 lg:grid-cols-[.82fr_1.18fr] lg:px-10 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-forest-800"
          >
            <MapPin size={16} /> Sauraha, Chitwan, Nepal
          </motion.div>
          <div className="mt-7 overflow-hidden">
            <motion.h1
              initial={reduced ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease }}
              className="text-[clamp(3.1rem,6.8vw,6.9rem)] font-bold leading-[.96] tracking-[-0.055em] text-forest-950"
            >
              Feel at home, close to the wild.
            </motion.h1>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease }}
            className="mt-7 max-w-xl text-[17px] font-normal leading-8 text-stone-600"
          >
            A small family-run lodge for slow mornings, home-cooked food and days spent exploring Sauraha and Chitwan.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/rooms" className="btn-primary">
              Explore the rooms <ArrowRight size={17} />
            </Link>
            <Link href="/story" className="btn-outline">
              Meet the family
            </Link>
          </motion.div>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.03 }}
            className="mt-10 border-l-2 border-[#bd7c52] pl-4 text-sm font-medium leading-6 text-stone-500"
          >
            Welcoming guests in Sauraha for more than 20 years.
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.15, delay: 0.08, ease }}
          className="relative h-[52svh] min-h-[430px] overflow-hidden rounded-[6rem_1.5rem_1.5rem_1.5rem] bg-forest-100 lg:h-[calc(100svh-8rem)] lg:min-h-[610px] lg:[border-radius:42%_1.5rem_1.5rem_42%/28%_1.5rem_1.5rem_28%]"
        >
          <motion.div style={reduced ? undefined : { x, y, scale: 1.035 }} className="absolute -inset-3">
            {image && <AssetImage src={image} alt="A comfortable room at Tiffin Home in Sauraha" className="h-full w-full object-cover" />}
          </motion.div>
          <div className="absolute inset-0 bg-forest-950/25" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
