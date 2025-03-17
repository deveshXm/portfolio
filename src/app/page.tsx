'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MotionMain from '../components/MotionMain';

export default function Home() {
  // Basic setup for page
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      // Reset initial scroll position
      window.scrollTo(0, 0);
      
      // Set basic scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Return cleanup function
      return () => {
        // Ensure body is scrollable on unmount
        if (document.body) {
          document.body.style.overflow = 'auto';
        }
        document.documentElement.style.scrollBehavior = '';
      };
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-background">
      <Header />
      <MotionMain />
      <Footer />
    </div>
  );
}