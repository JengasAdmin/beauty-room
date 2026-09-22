/** @type {import('next').NextConfig} */

// STATIC_EXPORT=1 — сборка статики для GitHub Pages (без API-роутов, они выносятся скриптом build:pages).
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
        images: { unoptimized: true },
      }
    : {}),
  images: {
    ...(isStaticExport ? { unoptimized: true } : {}),
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
