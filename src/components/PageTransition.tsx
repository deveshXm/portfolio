'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Track navigation events
  useEffect(() => {
    // Scroll to top on page load/navigation
    window.scrollTo(0, 0);
    
    // Handle loading state
    setIsLoading(true);
    
    // Reset loading state after short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);
  
  // Animation variants with shorter, smoother transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
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
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-white/40 origin-left"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>
      
      {/* Page content with transition */}
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}