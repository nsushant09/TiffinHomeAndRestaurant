const STATIC_ASSETS: Record<string, string[]> = {
  'rooms/deluxe': [
    '/images/rooms/deluxe/IMG_2921.jpeg',
    '/images/rooms/deluxe/IMG_2922.jpeg',
  ],
  'rooms/standard-king': [
    '/images/rooms/standard-king/IMG_2914.jpeg',
    '/images/rooms/standard-king/IMG_2916.jpeg',
    '/images/rooms/standard-king/IMG_3031.jpeg',
  ],
  'rooms/standard-twin': [
    '/images/rooms/standard-twin/IMG_2914.jpeg',
    '/images/rooms/standard-twin/IMG_2916.jpeg',
    '/images/rooms/standard-twin/IMG_3031.jpeg',
  ],
  'experiences': [
    '/images/experiences/jungle-safari.jpg',
    '/images/experiences/rapti-canoe.jpg',
    '/images/experiences/tharu-village.jpg',
  ],
  'property': [
    '/images/property/tiffin-garden.jpg',
  ],
  'restaurant': [
    '/images/restaurant/tiffin-dining.jpg',
  ],
  'menu': [
    '/images/menu/PHOTO-2026-05-21-21-23-22%20(1).jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-22%20(2).jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-22.jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-23%20(1).jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-23%20(2).jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-23.jpeg',
    '/images/menu/PHOTO-2026-05-21-21-23-29.jpeg',
  ],
};

export function assetImages(folder: string): string[] {
  if (STATIC_ASSETS[folder]) {
    return STATIC_ASSETS[folder];
  }
  try {
    const fs = require('fs');
    const path = require('path');
    const extensions = /\.(jpg|jpeg|png|webp|avif|gif)$/i;
    const dir = path.join(process.cwd(), 'public', 'images', folder);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((f: string) => extensions.test(f)).map((f: string) => `/images/${folder}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export function allMenuImages() {
  return assetImages('menu');
}

