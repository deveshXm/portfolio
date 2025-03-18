const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

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

// Wrap config with plugins
module.exports = withBundleAnalyzer(withPWA(nextConfig));