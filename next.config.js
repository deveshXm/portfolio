/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static exports since it's a static site
  output: 'export',
  
  // Optimization settings that work with Turbopack
  images: {
    unoptimized: true, // For static exports
  },
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lodash'],
  },
};

module.exports = nextConfig;