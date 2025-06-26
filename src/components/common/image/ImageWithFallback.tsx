'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  fallbackAlt?: string;
  [key: string]: unknown;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackAlt, // Optional
  ...rest
}) => {
  const [imgInfo, setImgInfo] = useState({ src, alt });
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
    setImgInfo({ src, alt });
  }, [src, alt]);

  const handleError = () => {
    if (!hasError) { // Prevent infinite re-renders if fallbackSrc also fails
      setImgInfo({ src: fallbackSrc, alt: fallbackAlt ?? alt });
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgInfo.src}
      alt={imgInfo.alt}
      onError={handleError}
      {...rest}
    />
  );
};

export default ImageWithFallback;
