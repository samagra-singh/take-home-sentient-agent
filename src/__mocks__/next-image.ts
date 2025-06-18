import React from 'react';

export default function Image({ src, alt, width, height, className, ...props }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  [key: string]: unknown;
}) {
  return React.createElement('img', { src, alt, width, height, className, ...props });
}
