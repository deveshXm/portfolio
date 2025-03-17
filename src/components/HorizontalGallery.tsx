'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
}

interface HorizontalGalleryProps {
  projects: Project[];
}

export default function HorizontalGallery({ projects }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-24 md:py-32">
      <div className="pp-container">
        <div className="mb-16">
          <h2 className="pp-text-4xl md:pp-text-5xl font-serif tracking-tight mb-4">Featured Projects</h2>
          <p className="pp-text-lg text-text/70">Selected work from recent projects</p>
        </div>
        
        {/* Simple grid layout */}
        <div 
          ref={containerRef}
          className="pp-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  // Alternate large and small project cards
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      className={`${isLarge ? 'col-span-4 md:col-span-8' : 'col-span-4'} mb-16`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block group cursor-pointer"
        data-cursor-text="View"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black bg-opacity-5 mb-6">
          {/* Project image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src="/test.png" 
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Project number as overlay */}
            <span className="absolute bottom-4 right-4 text-xs font-mono text-white bg-black/80 px-2 py-1 z-10">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Layered hover effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Removed border animation */}
          
          {/* Reveal text indicator */}
          <div className="absolute bottom-6 left-6 overflow-hidden">
            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Project
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
            <p className="pp-text-micro text-text/50 mb-2">
              {project.category}
            </p>
            <h3 className="pp-text-xl md:pp-text-2xl font-serif tracking-tighter transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          
          {/* Animated arrow */}
          <div className="relative mt-2 overflow-hidden">
            <span className="block w-8 h-8 border border-text/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300"
              >
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}