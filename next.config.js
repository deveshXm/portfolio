/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static exports for production builds only
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Optimization settings
  images: {
    unoptimized: true, // For static exports
  },
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lodash'],
  },

  // Turn off TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Make sure we're not using dynamic features in static export
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;