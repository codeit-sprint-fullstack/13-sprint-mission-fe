"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type TouchEvent } from "react";
import { resolveImageUrl } from "@/shared/lib/resolveImageUrl";
import ArrowLeft from "@/assets/svg/ic_arrow_left.svg";
import ArrowRight from "@/assets/svg/ic_arrow_right.svg";

const SWIPE_THRESHOLD = 40;

type ImageGalleryProps = {
  images: string[];
  alt: string;
  fallbackSrc: StaticImageData;
  className?: string;
};

export default function ImageGallery({ images, alt, fallbackSrc, className }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;
  const currentSrc = hasImages ? resolveImageUrl(images[index]) : fallbackSrc;

  const goTo = (next: number) => {
    const total = images.length;
    setIndex(((next % total) + total) % total);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      goTo(index + (deltaX > 0 ? -1 : 1));
    }
    setTouchStartX(null);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 shrink-0 ${className ?? ""}`}
      onTouchStart={hasMultiple ? handleTouchStart : undefined}
      onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
    >
      <Image
        key={hasImages ? images[index] : "default"}
        src={currentSrc}
        alt={alt}
        fill
        className="object-cover"
        unoptimized={hasImages}
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="이전 이미지"
          >
            <Image src={ArrowLeft} alt="" width={14} height={14} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="다음 이미지"
          >
            <Image src={ArrowRight} alt="" width={14} height={14} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}번째 이미지로 이동`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
