'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  year: string;
  link: string;
}

interface FeaturedGridProps {
  projects: Project[];
}

export default function FeaturedGrid({ projects }: FeaturedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All Featured");
  const { projects: projectsData } = portfolioData;
  
  return (
    <section id="featured-section" className="py-24 md:py-32 relative">
      {/* Decorative elements */}
      <div className="absolute left-0 top-[10%] w-[40%] h-[1px] bg-white/5"></div>
      <div className="absolute right-0 bottom-[20%] w-[30%] h-[1px] bg-white/5"></div>
      <div className="absolute left-[10%] top-[20%] w-[1px] h-[30%] bg-white/5"></div>
      
      <motion.div 
        className="absolute right-[5%] top-[15%] w-20 h-20 rounded-full border border-white/10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="pp-container">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8 mb-16">
          {/* Section heading with additional details */}
          <div className="col-span-4 md:col-span-4">
            <h2 className="pp-text-4xl md:pp-text-5xl font-serif tracking-tight mb-4">Featured</h2>
            <p className="pp-text-lg text-text/70 mb-6">Selected achievements from my professional journey</p>
            
            <div className="hidden md:block mt-8 space-y-4">
              <div className="w-full h-[1px] bg-white/10"></div>
              <div className="flex justify-between text-white/30 text-sm">
                <span>Engineering</span>
                <span>Development</span>
              </div>
            </div>
          </div>
          
          {/* Project filters */}
          <div className="col-span-4 md:col-span-3 md:col-start-9">
            <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="pp-text-micro mb-4">Filter By</h3>
              <ul className="space-y-3">
                {projectsData.categories.map((category, index) => (
                  <li 
                    key={index}
                    className="text-sm flex items-center cursor-pointer"
                    onClick={() => setActiveFilter(category)}
                  >
                    <span className={`inline-block w-2 h-2 ${activeFilter === category ? 'bg-white/40' : 'bg-white/10'} mr-3`}></span>
                    <span className={`${activeFilter === category ? 'text-white' : 'text-white/50 hover:text-white'} transition-colors`}>
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Project grid with decorative elements */}
        <div 
          ref={containerRef}
          className="pp-grid relative"
        >
          {/* Grid background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>
          
          {projects
            .filter(project => 
              activeFilter === "All Featured" || 
              project.category.includes(activeFilter.replace("All ", "")))
            .map((project, index) => (
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
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group cursor-pointer"
        data-cursor-text="View"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black bg-opacity-5 mb-6 border border-white/5 group-hover:border-white/20 transition-colors duration-500">
          {/* Project image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
            />
            
            {/* Project number as overlay */}
            <div className="absolute top-4 left-4 flex items-center space-x-3 z-10">
              <span className="text-xs font-mono text-white/70">{String(index + 1).padStart(2, '0')}</span>
              <span className="h-[1px] w-8 bg-white/30"></span>
            </div>
            
            {/* Project tags */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur-sm rounded-sm">
                {project.category.split('/')[0].trim()}
              </span>
            </div>
          </div>
          
          {/* Layered hover effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 pointer-events-none"></div>
          
          {/* Reveal text indicator */}
          <div className="absolute bottom-6 left-6 overflow-hidden">
            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <span className="text-xs uppercase tracking-widest text-white/80 flex items-center gap-2 border border-white/20 px-3 py-1 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-7 transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
            <p className="pp-text-micro text-white/40 mb-2 flex items-center">
              <span className="inline-block w-4 h-[1px] bg-white/30 mr-3"></span>
              {project.category}
            </p>
            <h3 className="pp-text-xl md:pp-text-2xl font-serif tracking-tighter transition-colors duration-300">
              {project.title}
            </h3>
            
            {/* Quick project details */}
            <div className="mt-3 flex gap-4">
              <span className="text-xs text-white/50">{project.year}</span>
              <span className="text-xs text-white/50">{project.category.includes("Engineering") ? "Engineering" : "Development"}</span>
            </div>
          </div>
          
          {/* Animated arrow button */}
          <div className="col-span-1 flex justify-end items-start">
            <div className="relative mt-2 overflow-hidden">
              <span className="block w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300 text-white"
                >
                  <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}