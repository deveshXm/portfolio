'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over any clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a');
      
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Only enable custom cursor on non-touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      animate={{
        x: position.x - (isHovering ? 15 : 12),
        y: position.y - (isHovering ? 15 : 12),
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 30
        }}
      >
        <motion.div 
          className="h-[24px] w-[24px] rounded-full"
          animate={{
            backgroundColor: isHovering ? 'rgba(255, 92, 0, 0.2)' : 'rgba(0, 0, 0, 0.07)'
          }}
        />
        
        <motion.div 
          className="absolute h-[4px] w-[4px] rounded-full"
          animate={{
            backgroundColor: isHovering ? 'rgba(255, 92, 0, 1)' : 'rgba(0, 0, 0, 0.3)'
          }}
        />
      </motion.div>
    </motion.div>
  );
}