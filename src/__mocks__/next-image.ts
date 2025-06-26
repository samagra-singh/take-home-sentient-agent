import React from 'react';

const Image: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  [key: string]: unknown;
}> = ({ src, alt, width, height, className, ...props }) => {
  return React.createElement('img', { src, alt, width, height, className, ...props });
};

export default Image;
