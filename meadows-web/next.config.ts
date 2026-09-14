import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['gsap'],
  // The Mada app sits one level up with its own lockfile; pin the root to this app.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
