'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import React from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  
  const { personal, social, navigation } = portfolioData;
  
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
  
  // Menu toggle with body scroll control
  useEffect(() => {
    if (isMenuOpen) {
      // Disable body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable body scroll when menu is closed
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800
          ${scrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-8'}`}
      >
        <div className="pp-container flex items-center justify-between">
          <Link 
            href="/" 
            className="text-lg font-sans font-medium tracking-tighter text-white"
          >
            {personal.name.split(' ')[0]}
          </Link>
          
          <nav className="hidden md:flex items-center gap-12">
            {navigation.main.map((item, index) => (
              <NavLink key={index} href={`/${item.toLowerCase()}`}>{item}</NavLink>
            ))}
          </nav>
          
          <button 
            className="relative z-50 w-10 h-10 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
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
      
      {/* Mobile Menu with transition */}
      <div 
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
          <div className="pp-container py-12 pt-24">
            <h2 className="pp-text-micro text-text/50 mb-8">Menu</h2>
            
            {/* Main Navigation */}
            <ul>
              {navigation.main.map((item, index) => {
                const isBlogsLink = item.toLowerCase() === 'blogs';
                
                return (
                  <li key={index} className="mb-6">
                    {isBlogsLink ? (
                      <Link 
                        href="/blogs"
                        className="pp-text-5xl font-serif tracking-tightest text-white block"
                        onClick={() => toggleMenu()}
                      >
                        {item}
                      </Link>
                    ) : (
                      <a 
                        href="#"
                        className="pp-text-5xl font-serif tracking-tightest text-white block"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu();
                          
                          // Get section mapping
                          const sectionId = item.toLowerCase();
                          const sectionMap: Record<string, string> = {
                            '': 'hero-section',
                            'work': 'featured-section', 
                            'about': 'about-section',
                            'contact': 'contact-section'
                          };
                          
                          const targetId = sectionMap[sectionId] || sectionId;
                          
                          // Wait for menu to close, then scroll
                          setTimeout(() => {
                            const targetElement = document.getElementById(targetId);
                            if (targetElement) {
                              window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                              });
                            }
                          }, 300);
                        }}
                      >
                        {item}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* Contact Section */}
            <div className="mt-12">
              <h2 className="pp-text-micro text-text/50 mb-6">Contact</h2>
              <a 
                href={`mailto:${personal.contact.email}`}
                className="pp-text-lg font-serif tracking-tighter text-white block mb-3"
                data-cursor-text="Email"
              >
                {personal.contact.email}
              </a>
              
              <div className="flex gap-8 mt-6">
                <a href={social.github} target="_blank" rel="noopener noreferrer" 
                   className="pp-text-sm font-sans uppercase tracking-widest text-white">
                  GH
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="pp-text-sm font-sans uppercase tracking-widest text-white">
                  Li
                </a>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" 
                   className="pp-text-sm font-sans uppercase tracking-widest text-white">
                  X
                </a>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  // Check if the href is for the blogs page
  const isBlogsLink = href.toLowerCase() === '/blogs';
  
  const handleClick = (e: React.MouseEvent) => {
    // For blogs link, don't prevent default to allow normal navigation
    if (isBlogsLink) {
      return;
    }
    
    e.preventDefault();
    
    // Get the section id from href
    const sectionId = href.replace('/', '');
    const sectionName = sectionId || 'hero'; // Default to hero if empty (home)
    
    // Create a mapping of navigation items to section IDs
    const sectionMap: Record<string, string> = {
      '': 'hero-section',
      'work': 'featured-section',
      'about': 'about-section',
      'contact': 'contact-section'
    };
    
    const targetId = sectionMap[sectionName] || sectionName;
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Adjust offset as needed
        behavior: 'smooth'
      });
    }
  };
  
  // If it's the blogs link, use Next's Link component
  if (isBlogsLink) {
    return (
      <Link 
        href={href}
        className="pp-text-micro text-white relative overflow-hidden group cursor-pointer"
      >
        <span className="block">{children}</span>
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-400 group-hover:w-full"></span>
      </Link>
    );
  }
  
  // For other links, use the traditional anchor with smooth scroll
  return (
    <a 
      href={href}
      onClick={handleClick}
      className="pp-text-micro text-white relative overflow-hidden group cursor-pointer"
    >
      <span className="block">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-400 group-hover:w-full"></span>
    </a>
  );
}


function SocialLink({ href, label }: { href: string, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="pp-text-sm font-sans uppercase tracking-widest relative overflow-hidden group text-white"
      data-cursor-text={label}
      style={{ opacity: 1 }}
    >
      <span className="block">{label}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-text transition-all duration-400 group-hover:w-full"></span>
    </a>
  );
}