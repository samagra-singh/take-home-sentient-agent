import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Env variables available at build time and runtime for both client and server.
  env: {
    // So, APIs work on all Vercel deployments regardless of domain.
    NEXT_PUBLIC_BASE_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}` // For Vercel deployments, use the VERCEL_URL
      : 'http://localhost:3000', // Fallback for local development (if not using vercel dev)
  },
};

export default nextConfig;
