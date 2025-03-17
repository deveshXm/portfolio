'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import React from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isMenuOpen) {
      // Animate menu opening
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        pointerEvents: "auto"
      });
      
      // Staggered animation for menu items
      if (navLinksRef.current) {
        gsap.fromTo(
          navLinksRef.current.children,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            delay: 0.2, 
            duration: 0.8, 
            ease: "power2.out" 
          }
        );
      }
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Animate menu closing
      gsap.to(menuRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        pointerEvents: "none"
      });
      
      // Enable body scroll
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 mix-blend-difference
          ${scrolled ? 'py-4' : 'py-8'}`}
      >
        <div className="pp-container flex items-center justify-between">
          <Link 
            href="/" 
            className="text-lg font-sans font-medium tracking-tighter text-white"
            data-cursor-text="Home"
          >
            YODA
          </Link>
          
          <nav className="hidden md:flex items-center gap-12">
            <NavLink href="/work">Work</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
          
          <button 
            className="relative z-50 w-10 h-10 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            data-cursor-text={isMenuOpen ? "Close" : "Menu"}
          >
            <div className="flex flex-col justify-center items-end h-full w-full">
              <span 
                className={`block h-[1px] bg-white transition-all duration-400
                  ${isMenuOpen ? 'w-6 rotate-45 translate-y-[0.5px]' : 'w-6'}`}
              ></span>
              <span 
                className={`block h-[1px] bg-white transition-all duration-400 mt-1.5
                  ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[0.5px]' : 'w-4'}`}
              ></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Full screen menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background flex flex-col justify-center opacity-0 pointer-events-none"
      >
        <div 
          ref={navLinksRef}
          className="pp-container flex flex-col gap-3 md:gap-4 items-start"
        >
          <div className="pp-text-micro mb-8 text-text/50">Menu</div>
          <MobileNavLink href="/work" onClick={toggleMenu}>Work</MobileNavLink>
          <MobileNavLink href="/about" onClick={toggleMenu}>About</MobileNavLink>
          <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
          
          <div className="mt-20 md:mt-40">
            <div className="pp-text-micro mb-6 text-text/50">Contact</div>
            <a 
              href="mailto:hello@yoda.design" 
              className="pp-text-lg md:pp-text-xl font-serif tracking-tighter block mb-3 pp-link-hover"
              data-cursor-text="Email"
            >
              hello@yoda.design
            </a>
            <div className="flex gap-8 mt-6">
              <SocialLink href="https://twitter.com" label="Tw" />
              <SocialLink href="https://instagram.com" label="Ig" />
              <SocialLink href="https://linkedin.com" label="Li" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="pp-text-micro text-white relative overflow-hidden group"
      data-cursor-text={children as string}
    >
      <span className="block">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-400 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      className="pp-text-5xl md:pp-text-7xl font-serif tracking-tightest block opacity-0"
      onClick={onClick}
      data-cursor-text={children as string}
    >
      <div className="relative overflow-hidden group">
        <motion.span
          className="block"
          whileHover={{ x: 20 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          {children}
        </motion.span>
      </div>
    </Link>
  );
}

function SocialLink({ href, label }: { href: string, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="pp-text-sm font-sans uppercase tracking-widest relative overflow-hidden group"
      data-cursor-text={label}
    >
      <span className="block">{label}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-text transition-all duration-400 group-hover:w-full"></span>
    </a>
  );
}