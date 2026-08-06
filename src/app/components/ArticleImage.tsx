'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { useState } from 'react';

const DEFAULT_IMAGE = '/images/default-product.svg';

interface ArticleImageProps {
  src?: string | null;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}

function passthroughLoader({ src }: ImageLoaderProps): string {
  return src;
}

export default function ArticleImage({
  src,
  alt = '',
  width,
  height,
  className,
}: ArticleImageProps) {
  const requestedSrc = src || DEFAULT_IMAGE;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = failedSrc === requestedSrc ? DEFAULT_IMAGE : requestedSrc;

  return (
    <Image
      loader={passthroughLoader}
      unoptimized
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setFailedSrc(requestedSrc)}
    />
  );
}
