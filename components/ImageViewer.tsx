'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export default function ImageViewer({
  images,
  currentIndex,
  onClose,
  onSelect,
}: ImageViewerProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentSrc = isOpen ? images[currentIndex] : null;
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);

  const prev = useCallback(() => {
    if (currentIndex === null) return;
    onSelect((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelect]);

  const next = useCallback(() => {
    if (currentIndex === null) return;
    onSelect((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelect]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, prev, next]);

  // Scroll wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 220) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 20) {
      lastScrollTime.current = now;
      if (delta > 0) next();
      else prev();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) next();
      else prev();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // z-[99999] guarantees it sits above the fixed navbar and all page content
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/95 backdrop-blur-xl"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            // Clicking backdrop closes viewer
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Top Bar: Counter & Prominent Close Button */}
          <div className="relative z-30 flex h-20 items-center justify-between px-6 sm:px-10">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              {currentIndex! + 1} / {images.length}
            </span>

            {/* Clickable Close Button with label + icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white hover:text-forest-950 active:scale-95"
              aria-label="Close image viewer"
            >
              <span>Close</span>
              <X size={18} className="transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Main Stage: clicking the empty background around image closes it */}
          <div
            className="relative flex flex-1 items-center justify-center px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-forest-950 active:scale-95 sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Current Image Container */}
            <div
              className="relative flex h-full max-h-[78vh] w-full max-w-5xl items-center justify-center p-2"
              onClick={(e) => {
                // If user clicks in empty margins inside this container, close
                if (e.target === e.currentTarget) onClose();
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSrc}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full"
                  onClick={(e) => e.stopPropagation()} // don't close when clicking the photo itself
                >
                  <Image
                    src={currentSrc}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-forest-950 active:scale-95 sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar: Instructions */}
          <div
            className="flex h-14 items-center justify-center text-xs text-white/50"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            Click outside photo, press Esc, or click Close to exit
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
