/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
    loader: 'default',
    domains: [],
  },
  
  // Optimization settings
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lodash'],
  },

  // Turn off TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;