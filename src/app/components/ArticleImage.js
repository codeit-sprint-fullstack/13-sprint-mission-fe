'use client';

import Image from 'next/image';
import { useState } from 'react';

const DEFAULT_IMAGE = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Panda';

function passthroughLoader({ src }) {
  return src;
}

export default function ArticleImage({
  src,
  alt = '',
  width,
  height,
  className,
}) {
  const requestedSrc = src || DEFAULT_IMAGE;
  const [failedSrc, setFailedSrc] = useState(null);
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
