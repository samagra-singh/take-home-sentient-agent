// This declaration tells TypeScript how to handle .svg imports.
// It states that when you import a file ending with .svg,
// its default export is a React functional component.
declare module '*.svg' {
  import type React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
