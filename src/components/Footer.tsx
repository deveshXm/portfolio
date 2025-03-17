'use client';

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 pt-16 border-t border-black/10">
      <div className="pp-container">
        <div className="pp-grid">
          <div className="col-span-4 md:col-span-3">
            <h3 className="text-lg font-medium mb-4">YODA</h3>
            <p className="text-sm text-black/70 max-w-[280px]">
              Designer and developer creating thoughtful, memorable digital experiences.
            </p>
          </div>
          
          <div className="col-span-4 md:col-span-3 mt-8 md:mt-0">
            <h4 className="text-sm font-medium mb-4">Links</h4>
            <ul className="flex flex-col gap-2">
              <li><FooterLink href="/work">Work</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-3 mt-8 md:mt-0">
            <h4 className="text-sm font-medium mb-4">Connect</h4>
            <ul className="flex flex-col gap-2">
              <li><FooterLink href="https://twitter.com" target="_blank">Twitter</FooterLink></li>
              <li><FooterLink href="https://instagram.com" target="_blank">Instagram</FooterLink></li>
              <li><FooterLink href="https://linkedin.com" target="_blank">LinkedIn</FooterLink></li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-3 mt-8 md:mt-0">
            <h4 className="text-sm font-medium mb-4">Contact</h4>
            <a href="mailto:hello@yoda.design" className="text-sm text-black/70 hover:text-accent transition-colors">
              hello@yoda.design
            </a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-xs text-black/60">
            © {currentYear} YODA. All rights reserved.
          </p>
          
          <p className="text-xs text-black/60">
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, target }: { href: string, children: React.ReactNode, target?: string }) {
  return (
    <Link 
      href={href} 
      className="text-sm text-black/70 hover:text-accent transition-colors"
      target={target}
    >
      {children}
    </Link>
  );
}