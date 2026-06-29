import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Compile shared workspace packages (shipped as TS source) on the fly.
  transpilePackages: ['@beactive/ui', '@beactive/types'],
};

export default nextConfig;
