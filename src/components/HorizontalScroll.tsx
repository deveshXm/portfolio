'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';

const HorizontalScroll = () => {
  // Sample project data
  const projects = [
    { id: 1, title: "Editorial New Typeface", description: "Typography / Design System", color: "bg-[#1a1a1a]" },
    { id: 2, title: "Pangram Pangram Website", description: "Web Design / Development", color: "bg-[#242424]" },
    { id: 3, title: "Helvetica Now", description: "Typography / Design System", color: "bg-[#1a1a1a]" },
    { id: 4, title: "Fashion Portfolio", description: "Branding / Web Design", color: "bg-[#242424]" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Smoother fade transition variants
  const variants = {
    enter: (direction) => {
      return {
        opacity: 0,
        y: direction > 0 ? 20 : -20,
        scale: 0.98
      };
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: (direction) => {
      return {
        opacity: 0,
        y: direction < 0 ? 20 : -20,
        scale: 0.98
      };
    }
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`w-full h-full flex items-center justify-center ${projects[currentIndex].color}`}
          >
            <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-12 gap-8 w-full">
              <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-white/50 text-xs uppercase tracking-widest mb-4 border-l-2 border-accent pl-3"
                >
                  Featured Project {currentIndex + 1}/{projects.length}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl md:text-6xl text-white font-serif tracking-tight mb-6 leading-none"
                >
                  {projects[currentIndex].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-white/70 mb-8 text-lg"
                >
                  {projects[currentIndex].description}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <span className="px-3 py-1 border border-white/20 text-white/70 text-xs rounded-full">Web Design</span>
                  <span className="px-3 py-1 border border-white/20 text-white/70 text-xs rounded-full">Development</span>
                  <span className="px-3 py-1 border border-white/20 text-white/70 text-xs rounded-full">Branding</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <button className="px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 inline-flex w-fit rounded-sm group">
                    <span className="mr-2">View Project</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.3 }}
                className="col-span-12 md:col-span-7 md:col-start-6 aspect-[16/9] flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent mix-blend-overlay"></div>
                <div className="w-full h-full overflow-hidden relative group">
                  <img 
                    src="/test.png" 
                    alt={projects[currentIndex].title} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="absolute -bottom-5 -right-5 w-24 h-24 border border-accent/30 hidden md:block"
                ></motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="absolute -top-5 -left-5 w-16 h-16 border border-accent/30 hidden md:block"
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons with better styling */}
      <div className="absolute bottom-12 md:bottom-20 left-0 right-0 flex justify-between items-center px-8 md:px-16">
        <div className="flex items-center gap-6">
          <button 
            onClick={goToPrev}
            className={`w-14 h-14 border rounded-full flex items-center justify-center transition-all duration-300 ${
              currentIndex === 0 
                ? 'border-white/10 text-white/30 cursor-not-allowed' 
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            className={`w-14 h-14 border rounded-full flex items-center justify-center transition-all duration-300 ${
              currentIndex === projects.length - 1 
                ? 'border-white/10 text-white/30 cursor-not-allowed' 
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            disabled={currentIndex === projects.length - 1}
            aria-label="Next project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex space-x-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-accent' : 'bg-white/20'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;