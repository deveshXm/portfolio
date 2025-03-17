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
        <div className="mb-12">
          <h2 className="pp-text-micro text-text/50 mb-2">Featured Projects</h2>
          <p className="pp-text-lg font-serif tracking-tight text-text/70">Selected work from recent projects</p>
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
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black bg-opacity-5 mb-6">
          {/* Project image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-black text-opacity-30 text-4xl font-serif">
            {index + 1}
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        </div>
        
        <div>
          <p className="pp-text-micro text-text/50 mb-2">
            {project.category}
          </p>
          <h3 className="pp-text-xl md:pp-text-2xl font-serif tracking-tighter group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}