import './globals.css';

import cx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sentient Agent',
  description:
    'A basic AI chat agent built with Next.js and mock API routes (Take home assignment for Sentient Foundation)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(inter.className, 'bg-gray-50 text-gray-800')}>
        {children}
      </body>
    </html>
  );
}
