'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
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
    
    // Initialize text to be hidden
    gsap.set(textRef.current, { 
      y: y, 
      opacity: 0 
    });
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: triggerPosition,
        toggleActions: once ? "play none none none" : "play none none reset"
      }
    });
    
    // Animate text in
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: duration,
      ease: "power3.out",
      delay: delay
    });
    
    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [delay, duration, once, stagger, triggerPosition, y]);

  // @ts-ignore - Component can be any valid HTML element
  return <Component ref={textRef} className={className}>{children}</Component>;
}