'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Toggle body scroll
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'py-4 bg-white/95 backdrop-blur-sm' : 'py-6 bg-transparent'}`}
      >
        <div className="pp-container flex items-center justify-between">
          <Link href="/" className="text-lg font-medium tracking-tightest">
            YODA
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/work">Work</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
          
          <button 
            className="relative z-50 w-8 h-8 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center h-full w-full">
              <span 
                className={`block w-6 h-[1.5px] bg-black transition-all duration-300
                  ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
              ></span>
              <span 
                className={`block w-6 h-[1.5px] bg-black transition-all duration-300 mt-1
                  ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}
              ></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ease-out
          ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}
          md:hidden`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-6">
          <MobileNavLink href="/work" onClick={toggleMenu}>Work</MobileNavLink>
          <MobileNavLink href="/about" onClick={toggleMenu}>About</MobileNavLink>
          <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm tracking-tight inline-block relative group"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      className="text-3xl tracking-tight inline-block"
      onClick={onClick}
    >
      <span>{children}</span>
    </Link>
  );
}