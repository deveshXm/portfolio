'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  
  // Staggered animation for footer elements
  useEffect(() => {
    if (!footerRef.current || !linksRef.current) return;
    
    const footerElements = footerRef.current.querySelectorAll('.footer-animate');
    const linkElements = linksRef.current.querySelectorAll('li');
    
    gsap.fromTo(
      footerElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
        }
      }
    );
    
    gsap.fromTo(
      linkElements,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top bottom-=100",
        }
      }
    );
  }, []);
  
  return (
    <footer ref={footerRef} className="py-16 md:py-32 bg-black text-white relative">
      <div className="pp-container">
        <div className="pp-grid">
          <div className="col-span-4 md:col-span-4 footer-animate">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <h3 className="text-2xl font-serif tracking-tighter text-white">Y</h3>
            </div>
            <p className="pp-text-md text-white/60 max-w-[280px]">
              Designer and developer creating thoughtful, memorable digital experiences.
            </p>
          </div>
          
          <div className="col-span-4 md:col-span-2 md:col-start-7 mt-12 md:mt-0 footer-animate">
            <h4 className="pp-text-micro mb-6">Navigate</h4>
            <ul ref={linksRef} className="flex flex-col gap-4">
              <li><FooterLink href="/work">Work</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-2 md:col-start-9 mt-12 md:mt-0 footer-animate">
            <h4 className="pp-text-micro mb-6">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <FooterLink 
                  href="https://twitter.com" 
                  target="_blank"
                  data-cursor-text="Twitter"
                >
                  Twitter
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://instagram.com" 
                  target="_blank"
                  data-cursor-text="Instagram"
                >
                  Instagram
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://linkedin.com" 
                  target="_blank"
                  data-cursor-text="LinkedIn"
                >
                  LinkedIn
                </FooterLink>
              </li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-3 mt-20 footer-animate">
            <h4 className="pp-text-micro mb-6">Get in Touch</h4>
            <a 
              href="mailto:hello@yoda.design" 
              className="pp-text-lg font-serif tracking-tighter text-white pp-link-hover inline-block"
              data-cursor-text="Email"
            >
              hello@yoda.design
            </a>
          </div>
          
          <div className="col-span-full mt-32 footer-animate">
            <div className="h-px w-full bg-white/10 mb-8"></div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <p className="pp-text-xs text-white/40">
                © {currentYear} YODA. All rights reserved.
              </p>
              
              <p className="pp-text-xs text-white/40 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-white/40"></span>
                Crafted with intention
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual elements */}
      <div className="absolute bottom-40 right-[10%] w-1 h-1 rounded-full bg-white/40 animate-pulse"></div>
      <div className="absolute top-20 left-[25%] w-2 h-2 rounded-full bg-white/20"></div>
    </footer>
  );
}

function FooterLink({ 
  href, 
  children, 
  target,
  ...props 
}: { 
  href: string, 
  children: React.ReactNode, 
  target?: string,
  [key: string]: any 
}) {
  return (
    <Link 
      href={href} 
      className="pp-text-md text-white/60 pp-link-hover inline-block"
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
}