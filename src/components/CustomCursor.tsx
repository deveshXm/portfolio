'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorText) return;
    
    // Track button hover state
    let isOnButton = false;
    
    // Initial position
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursorText.style.left = `${clientX}px`;
      cursorText.style.top = `${clientY}px`;
    };
    
    // Array of button selectors
    const buttonSelectors = [
      'button', 
      '[role="button"]',
      '[data-magnetic-wrap]', 
      '.pp-btn',
      '[data-cursor-text]',
      'a.pp-link-hover'
    ];
    
    // Add specific data attribute to all button elements for easier detection
    const markButtons = () => {
      buttonSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (el instanceof HTMLElement) {
            el.setAttribute('data-cursor-hover', 'true');
          }
        });
      });
    };
    
    // Run once on mount
    markButtons();
    
    // Helper to check if an element is a button (now simplified)
    const isButtonElement = (el: any): boolean => {
      if (!el) return false;
      if (!(el instanceof Element)) return false;
      
      return (
        el.hasAttribute('data-cursor-hover') || 
        el.closest('[data-cursor-hover]') !== null
      );
    };
    
    // Check if background is dark (to adapt text color)
    const checkBackground = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y) as HTMLElement;
      if (!element) return false;
      
      // Get the background color
      let bgColor: string;
      let currentEl = element;
      
      // Try to find a background color by traversing up the DOM
      while (currentEl && currentEl !== document.body) {
        const computedStyle = window.getComputedStyle(currentEl);
        bgColor = computedStyle.backgroundColor;
        
        // If we found a color that's not transparent/inherit, check its lightness
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // For black sections - detect by class or bg color
          if (
            currentEl.classList.contains('bg-black') || 
            bgColor === 'rgb(0, 0, 0)' || 
            bgColor.includes('rgba(0, 0, 0')
          ) {
            return true;
          }
          
          // Parse RGB format
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            
            // Rough estimate of "darkness" - lower values are darker
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128; // Return true if dark
          }
        }
        
        currentEl = currentEl.parentElement as HTMLElement;
      }
      
      // Default to false (assume light background)
      return false;
    };
    
    // Use mousemove to detect button hover (more reliable)
    const checkButtonHover = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement;
      
      if (target && isButtonElement(target)) {
        if (!isOnButton) {
          isOnButton = true;
          setIsHovering(true);
        }
      } else if (isOnButton) {
        isOnButton = false;
        setIsHovering(false);
      }
    };
    
    // Add MutationObserver to mark new buttons
    const observer = new MutationObserver(mutations => {
      // When new elements are added, mark any buttons
      markButtons();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // These are now just backups for the main hover detection
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isButtonElement(target)) {
        isOnButton = true;
        setIsHovering(true);
        
        // Check for text
        const text = target.getAttribute('data-cursor-text') || 
                    target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      }
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      // Only reset if leaving a button and not entering another button
      if (isButtonElement(target) && !isButtonElement(relatedTarget)) {
        isOnButton = false;
        setIsHovering(false);
      }
    };
    
    // Handle mouse down for click effect
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Combined mouse handler (save reference for cleanup)
    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor position
      moveCursor(e);
      // Check button hover (more reliable method)
      checkButtonHover(e);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    // Add style to hide cursor on button elements
    const style = document.createElement('style');
    style.textContent = `
      button, 
      [role="button"], 
      .pp-btn,
      [data-magnetic-wrap] *,
      [data-cursor-text],
      [data-cursor-hover] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      // Remove event listeners with proper references
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Disconnect observer
      observer.disconnect();
      
      // Restore cursor
      document.documentElement.style.cursor = '';
      
      // Remove style
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        animate={{
          width: isHovering ? 60 : isClicking ? 12 : 16,  // Make expanded size smaller
          height: isHovering ? 60 : isClicking ? 12 : 16,
          opacity: 1,
          backgroundColor: "#ffffff",
          // Add subtle outer glow when hovering
          boxShadow: isHovering 
            ? "0 0 0 2px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1)" 
            : "none",
        }}
        initial={{
          opacity: 0,
          width: 16,
          height: 16,
          backgroundColor: "#ffffff",
          boxShadow: "none"
        }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: [0.23, 1, 0.32, 1]
        }}
      />
      
      {/* Dynamic arrow that moves with the cursor */}
      <motion.div
        ref={cursorTextRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0,
        }}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        transition={{
          duration: 0.2
        }}
      >
        {isHovering && (
          <ArrowIndicator />
        )}
      </motion.div>
      
      {/* Cursor trails */}
      <CursorTrail />
    </>
  );
}

// Dynamic Arrow component that responds to cursor movement
function ArrowIndicator() {
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Set initial position on mount to avoid NaN calculations
    const setInitialPosition = (e: MouseEvent) => {
      prevMousePos.current = { x: e.clientX, y: e.clientY };
      // Remove this listener after first use
      document.removeEventListener('mousemove', setInitialPosition);
      // Add the main listener
      document.addEventListener('mousemove', handleMouseMove);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate direction and distance from previous position
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      
      // Only update if the movement is significant
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Calculate angle of movement (in degrees)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Calculate magnitude of movement (speed)
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const normalizedMagnitude = Math.min(magnitude / 10, 1);
        
        // Set rotation to follow movement direction
        setRotation(angle + 45); // +45 to align arrow correctly
        
        // Create a slight offset in the direction of movement
        const offsetX = (dx / magnitude) * normalizedMagnitude * 3;
        const offsetY = (dy / magnitude) * normalizedMagnitude * 3;
        setOffset({ x: offsetX, y: offsetY });
        
        // Update previous position
        prevMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    // First set the initial position before tracking movement
    document.addEventListener('mousemove', setInitialPosition);
    
    return () => {
      document.removeEventListener('mousemove', setInitialPosition);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="mix-blend-difference text-black"
      style={{
        opacity: 0.9,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <path 
        d="M7 17L17 7M17 7H10M17 7V14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ultra-minimal cursor trail effect
function CursorTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);
  const requestRef = useRef<number>();
  const positionRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  
  // Update mouse position and calculate speed
  const updateMousePosition = (e: MouseEvent) => {
    const prevX = positionRef.current.x;
    const prevY = positionRef.current.y;
    const nextX = e.clientX;
    const nextY = e.clientY;
    
    // Calculate cursor speed (distance moved since last frame)
    const deltaX = nextX - prevX;
    const deltaY = nextY - prevY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Update speed - higher number = more trails when moving fast
    speedRef.current = Math.min(distance * 0.1, 1);
    
    // Update position
    positionRef.current = { x: nextX, y: nextY };
    prevPositionRef.current = { x: prevX, y: prevY };
  };

  // Animation loop
  const animate = () => {
    // Only create trail when cursor is moving
    if (speedRef.current > 0.1) {
      // Create a new trail point at current position
      const point = {
        x: positionRef.current.x,
        y: positionRef.current.y,
        opacity: 0.15 * speedRef.current, // More opacity when moving faster
      };

      // Update trail with new point and fade out existing points
      setTrail(prevTrail => {
        // Only keep 2 trail points max for minimal effect
        const newTrail = [point, ...prevTrail.slice(0, 1)].map((point, i) => ({
          ...point,
          opacity: point.opacity * (i === 0 ? 1 : 0.5), // Fade out old points faster
        }));
        return newTrail;
      });
    } else {
      // Remove trail points when not moving
      if (trail.length > 0) {
        setTrail([]);
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start animation and add mouse event
    requestRef.current = requestAnimationFrame(animate);
    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      // Clean up
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {trail.map((point, i) => (
        <div
          key={i}
          className="fixed rounded-full bg-white mix-blend-difference pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9998]"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${4 - i * 2}px`, // First dot 4px, second 2px
            height: `${4 - i * 2}px`,
            opacity: point.opacity,
            transition: 'opacity 0.1s ease-out',
          }}
        />
      ))}
    </>
  );
}