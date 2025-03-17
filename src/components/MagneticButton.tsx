'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  strength?: number;
  cursorText?: string;
  dark?: boolean;
}

export default function MagneticButton({
  href,
  children,
  className = '',
  external = false,
  strength = 0.3,
  cursorText,
  dark = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!buttonRef.current || !contentRef.current) return;
    
    const button = buttonRef.current;
    const content = contentRef.current;
    let bounds: DOMRect;
    
    const handleMouseEnter = () => {
      bounds = button.getBoundingClientRect();
      gsap.to(content, { scale: 1.1, duration: 0.4, ease: "power2.out" });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      gsap.to(content, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - bounds.left - bounds.width / 2) * strength;
      const y = (clientY - bounds.top - bounds.height / 2) * strength;
      
      gsap.to(button, { x, y, duration: 0.3, ease: "power2.out" });
      gsap.to(content, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
    };
    
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);
  
  const buttonClass = `pp-btn ${dark ? 'text-white' : 'text-text'} ${className}`;
  const contentClass = `pp-btn-text ${dark ? 'text-text group-hover:text-white' : 'text-white group-hover:text-text'}`;
  const bgClass = `pp-btn-bg ${dark ? 'bg-white' : 'bg-text'}`;
  
  const ButtonContent = () => (
    <div ref={buttonRef} data-magnetic-wrap className="relative inline-block">
      <div
        ref={contentRef}
        data-magnetic
        className={`${buttonClass} group`}
        data-cursor-text={cursorText}
      >
        <span className={contentClass}>
          <span className="inline-block relative z-10">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </span>
          <span className="ml-2 inline-block relative z-10 group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
            →
          </span>
        </span>
        <span className={bgClass}></span>
        
        {/* Removed decorative border animations */}
      </div>
    </div>
  );
  
  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <ButtonContent />
      </a>
    );
  }
  
  return (
    <Link href={href}>
      <ButtonContent />
    </Link>
  );
}