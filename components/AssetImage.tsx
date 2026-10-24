import Image from 'next/image';

export default function AssetImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-stone-200 text-stone-400 ${className || ''}`}>
        <span className="text-xs">No image</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
      className={className || ''}
    />
  );
}

