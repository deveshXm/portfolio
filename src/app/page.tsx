'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MotionMain from '../components/MotionMain';

export default function Home() {
  // Ensure no scrolling issues
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      // Reset initial scroll position
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
    
    // Return cleanup function
    return () => {
      // Ensure body is scrollable on unmount
      if (document.body) {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      <MotionMain />
      <Footer />
    </div>
  );
}