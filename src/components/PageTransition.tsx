'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle route change events
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    
    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 600); // Match transition duration
    };
    
    // Add event listeners for route changes
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
    };
  }, []);
  
  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      transition: {
        type: "tween",
        ease: [0.22, 1, 0.36, 1]
      }
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Loading variants
  const loadingVariants = {
    initial: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      scaleX: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      {/* Loading indicator */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-accent origin-left transform-gpu"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layoutId="loading-bar"
          />
        )}
      </AnimatePresence>
      
      {/* Page content with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="will-change-transform transform-gpu"
          layoutId="page-content"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}