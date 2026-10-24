'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import ImageViewer from '@/components/ImageViewer';

// Real authentic photos from the property only (no AI images)
const IMAGES = [
  // Deluxe Room
  { id: 'deluxe-1', src: '/images/rooms/deluxe/IMG_2921.jpeg', category: 'rooms' },
  { id: 'deluxe-2', src: '/images/rooms/deluxe/IMG_2922.jpeg', category: 'rooms' },

  // Standard King Room
  { id: 'king-1', src: '/images/rooms/standard-king/IMG_2914.jpeg', category: 'rooms' },
  { id: 'king-2', src: '/images/rooms/standard-king/IMG_2916.jpeg', category: 'rooms' },
  { id: 'king-3', src: '/images/rooms/standard-king/IMG_3031.jpeg', category: 'rooms' },

  // Standard Twin Room
  { id: 'twin-1', src: '/images/rooms/standard-twin/IMG_2914.jpeg', category: 'rooms' },
  { id: 'twin-2', src: '/images/rooms/standard-twin/IMG_2916.jpeg', category: 'rooms' },
  { id: 'twin-3', src: '/images/rooms/standard-twin/IMG_3031.jpeg', category: 'rooms' },
];

const FILTERS = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'experiences', label: 'Activities & Safari' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const visibleImages = useMemo(() => {
    if (filter === 'all') return IMAGES;
    return IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#fbf8f1] pt-28 pb-20">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-10">
        {/* Back link & Title */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 transition-colors hover:text-forest-900"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
              Gallery
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'border border-forest-900/10 bg-white text-stone-600 hover:border-forest-700 hover:text-forest-900'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Grid or Empty State */}
        {visibleImages.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-16 text-center">
            <p className="text-base font-medium text-stone-600">
              Photos coming soon.
            </p>
            <p className="mt-1 text-xs text-stone-400">
              Authentic activity and safari photos will be updated shortly.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {visibleImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveIdx(i)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-200 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-forest-600/30"
                aria-label={`View photo ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest-950 shadow-md backdrop-blur-sm">
                    <Maximize2 size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Image Viewer */}
      <ImageViewer
        images={visibleImages.map((item) => item.src)}
        currentIndex={activeIdx}
        onClose={() => setActiveIdx(null)}
        onSelect={(idx) => setActiveIdx(idx)}
      />
    </main>
  );
}
