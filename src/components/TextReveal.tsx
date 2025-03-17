'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import React from 'react';

// Safely import ScrollTrigger without causing build errors
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/dist/ScrollTrigger').then(module => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

interface TextRevealProps {
  children: React.ReactNode;
  as?: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  triggerPosition?: string; // e.g., "top 80%"
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 1.2,
  stagger = 0.02,
  y = 100,
  triggerPosition = "top 90%",
  once = true,
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Initialize text to be hidden immediately
    gsap.set(textRef.current, { 
      y: y, 
      opacity: 0 
    });
    
    let tl: gsap.core.Timeline;
    
    // Check if we're running on the client
    if (typeof window !== 'undefined') {
      // Create a simple animation without ScrollTrigger first as fallback
      tl = gsap.timeline();
      tl.to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: duration,
        ease: "power3.out",
        delay: delay
      });
      
      // Try to set up ScrollTrigger if available
      const setupScrollTrigger = async () => {
        if (!ScrollTrigger) {
          try {
            const module = await import('gsap/dist/ScrollTrigger');
            ScrollTrigger = module.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);
          } catch (error) {
            console.warn("ScrollTrigger import failed", error);
            return; // Use the simple animation instead
          }
        }
        
        // Kill the simple animation if ScrollTrigger is available
        if (tl) tl.kill();
        
        // Create a new timeline with ScrollTrigger
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: triggerPosition,
            toggleActions: once ? "play none none none" : "play none none reset"
          }
        });
        
        // Animate text in with ScrollTrigger
        tl.to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: duration,
          ease: "power3.out",
          delay: delay
        });
      };
      
      setupScrollTrigger();
    }
    
    // Cleanup function
    return () => {
      if (tl) tl.kill();
    };
  }, [delay, duration, once, stagger, triggerPosition, y]);

  // @ts-ignore - Component can be any valid HTML element
  return <Component ref={textRef} className={className}>{children}</Component>;
}