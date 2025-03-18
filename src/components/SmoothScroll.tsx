'use client';

import { useEffect, ReactNode, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
  duration?: number;
}

export default function SmoothScroll({
  children,
  duration = 1.2,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    // Skip setup if window is undefined (SSR)
    if (typeof window === 'undefined') return;
    
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;
    
    // Add classical scroll effect styling
    const addClassicalStyles = () => {
      try {
        // Add sepia-toned overlay for classical effect
        const overlay = document.createElement('div');
        overlay.classList.add('classical-overlay');
        Object.assign(overlay.style, {
          position: 'fixed',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Behind content
          mixBlendMode: 'color',
          opacity: 0.05,
          backgroundColor: '#e0d6a9',
        });
        document.body.appendChild(overlay);
        
        // Add subtle grain texture
        const grain = document.createElement('div');
        grain.classList.add('classical-grain');
        Object.assign(grain.style, {
          position: 'fixed',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Behind content
          opacity: 0.08,
          backgroundImage: 'url("/noise.png")',
          mixBlendMode: 'multiply',
        });
        document.body.appendChild(grain);
        
        return () => {
          try {
            document.body.removeChild(overlay);
            document.body.removeChild(grain);
          } catch (e) {
            console.log('Error removing classical style elements', e);
          }
        };
      } catch (e) {
        console.log('Error adding classical style elements', e);
        return () => {};
      }
    };
    
    // Add classical styles
    const removeClassicalStyles = addClassicalStyles();
    
    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Set up the animation frame to update Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId) as HTMLElement;
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease out
          });
        }
      }
    };
    
    // Add click handler for smooth anchor scrolling
    document.addEventListener('click', handleAnchorClick);
    
    // Clean up on component unmount
    return () => {
      lenis.destroy();
      removeClassicalStyles();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [duration]);
  
  return <>{children}</>;
}