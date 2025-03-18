'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

// Define the interface for experience items
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  link: string;
  description: string;
  color: string;
  logo?: string;
  skills?: string[];
}

const WorkExperience = () => {
  const { experience } = portfolioData;
  const allExperiences: ExperienceItem[] = [...experience.timeline];
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);
  const [visibleExperienceIds, setVisibleExperienceIds] = useState<number[]>([1, 2]);
  
  // Get visible experiences
  const visibleExperiences = allExperiences.filter(exp => 
    visibleExperienceIds.includes(exp.id)
  );
  
  // Toggle showing all experiences
  const toggleShowAll = () => {
    if (showAllExperiences) {
      // Hide all except first two
      setShowAllExperiences(false);
      setVisibleExperienceIds([1, 2]);
      setSelectedId(null);
    } else {
      // Show all experiences
      setShowAllExperiences(true);
      setVisibleExperienceIds(allExperiences.map(exp => exp.id));
    }
  };
  
  // Handle experience selection
  const handleExperienceSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
      
      // If selected experience is not visible, show all
      if (!visibleExperienceIds.includes(id)) {
        setShowAllExperiences(true);
        setVisibleExperienceIds(allExperiences.map(exp => exp.id));
      }
      
      // Scroll to the selected experience
      setTimeout(() => {
        const element = document.getElementById(`experience-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <section id="experience" className="py-24 md:py-32 overflow-hidden relative bg-gradient-to-b from-black via-black/95 to-black">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02)_0%,transparent_60%)]"></div>
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-[30%] h-[1px] bg-white/5"></div>
      <div className="absolute right-0 bottom-0 w-[40%] h-[1px] bg-white/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="col-span-4 md:col-span-5 lg:col-span-4 relative">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-lg font-serif">#</span>
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Professional Path</div>
              </div>
              
              <h2 className="pp-text-4xl md:pp-text-5xl lg:pp-text-6xl font-serif tracking-tight mb-5">Work Experience</h2>
              <p className="pp-text-lg text-text/70 mb-6 max-w-sm">Roles and positions that have shaped my professional journey.</p>
            </div>
          </div>
          
          <div className="col-span-4 md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
            {/* Experience navigation */}
            <div className="overflow-x-auto scrollbar-none pb-4 border-b border-white/5">
              <div className="flex gap-1 md:gap-2 min-w-max">
                {allExperiences.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleExperienceSelect(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative group px-3 py-2 md:px-4 md:py-2.5 rounded-sm transition duration-300 hover:bg-white/5 ${
                      selectedId === item.id || hoveredId === item.id ? 'bg-white/5 text-white' : 'text-white/50'
                    } ${visibleExperienceIds.includes(item.id) ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-md ${
                        selectedId === item.id || hoveredId === item.id ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
                      } border transition-all`}>
                        {item.logo ? (
                          <img 
                            src={item.logo} 
                            alt={`${item.company} logo`}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <span className="font-serif">{item.company.charAt(0)}</span>
                        )}
                      </div>
                      <div className="hidden md:block text-sm">{item.company}</div>
                    </div>
                    
                    {/* Active indicator */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] transition-all ${
                      selectedId === item.id || hoveredId === item.id ? 'bg-white/50' : 'bg-transparent'
                    }`}></div>
                    
                    {/* Mobile tooltip */}
                    <div className={`absolute left-1/2 -translate-x-1/2 transform ${
                      hoveredId === item.id ? 'opacity-100 -top-10' : 'opacity-0 -top-8'
                    } transition-all duration-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm text-xs whitespace-nowrap border border-white/10 pointer-events-none md:hidden`}>
                      {item.company}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Experiences grid with asymmetric layout */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[8%] md:left-[8%] top-0 bottom-0 w-[1px] bg-white/5 z-10"></div>
          
          {/* Decorative grid lines */}
          <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden md:block"></div>
          <div className="absolute left-[65%] top-0 bottom-0 w-[1px] bg-white/[0.02] hidden md:block"></div>
          <div className="absolute left-0 right-0 top-[25%] h-[1px] bg-white/[0.02] hidden md:block"></div>
          <div className="absolute left-0 right-0 top-[75%] h-[1px] bg-white/[0.02] hidden md:block"></div>
          
          {/* No global background company names - we'll add them to each card directly */}
          
          {/* Experience items with staggered layout */}
          <div className="space-y-16 md:space-y-24">
            <AnimatePresence>
              {visibleExperiences.map((item, idx) => {
                // Asymmetric layout with different card widths and positions
                const isEven = idx % 2 === 0;
                
                return (
                  <motion.div
                    id={`experience-${item.id}`}
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.5, 
                        delay: idx * 0.1,
                        ease: [0.16, 1, 0.3, 1] 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -20,
                      transition: { duration: 0.2 } 
                    }}
                    className={`relative grid grid-cols-12 gap-4 md:gap-8 ${
                      selectedId === item.id ? 'z-10' : 'z-0'
                    }`}
                  >
                    {/* Large company name behind this specific experience - not inside the card */}
                    <div 
                      className={`absolute hidden md:block ${
                        isEven ? 'right-[20%]' : 'left-[20%]'
                      }`} 
                      style={{
                        top: isEven ? '-50px' : '-30px',
                        zIndex: -1,
                        pointerEvents: 'none'
                      }}
                    >
                      <div className="font-serif font-bold uppercase tracking-tighter whitespace-nowrap text-[220px] text-white/[0.012]">
                        {item.company.split(' ')[0]}
                      </div>
                    </div>
                    {/* Year marker for this experience */}
                    <div 
                      className="absolute left-[8%] md:left-[8%] transform -translate-x-1/2 text-xs font-mono text-white/40 z-20"
                      style={{ top: '-12px' }}
                    >
                      {item.duration.split(' - ')[0]}
                    </div>
                    
                    {/* Circle connector */}
                    <div className="absolute left-[8%] md:left-[8%] top-[18px] w-3 h-3 rounded-full bg-white/10 border border-white/20 transform -translate-x-1/2 z-20"></div>
                    
                    {/* Line from circle to content - varies by position */}
                    <div className={`absolute top-[22px] h-[1px] bg-white/10 z-10 ${
                      isEven 
                        ? 'left-[10%] w-[6%]' 
                        : 'left-[10%] md:left-[10%] w-[40%] md:w-[25%]'
                    }`}></div>
                    
                    {/* Decorative elements in empty spaces */}
                    {isEven ? (
                      <div className="hidden md:block absolute right-[15%] top-[60px] w-[10%] aspect-square">
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-white/5 rounded-sm transform rotate-45 opacity-20"></div>
                          <div className="absolute inset-[20%] border border-white/10 rounded-full"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block absolute left-[25%] top-[40px] w-[8%] aspect-square">
                        <div className="w-full h-full border-t border-l border-white/10 rounded-tl-sm"></div>
                      </div>
                    )}
                    
                    {/* Content area with dramatically asymmetric layout */}
                    <div className={`col-span-10 relative ${
                      isEven 
                        ? 'col-start-3 md:col-span-4 md:col-start-3' 
                        : 'col-start-3 md:col-span-5 md:col-start-7'
                    }`}>
                        {/* Experience card with high-end design aesthetic */}
                      <motion.div
                        className={`relative overflow-hidden backdrop-blur-sm border rounded-sm ${
                          selectedId === item.id 
                            ? 'border-white/20 shadow-lg' 
                            : 'border-white/5'
                        }`}
                        style={{
                          background: isEven 
                            ? 'linear-gradient(220deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' 
                            : 'linear-gradient(130deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)'
                        }}
                        whileHover={{ 
                          borderColor: 'rgba(255, 255, 255, 0.15)', 
                          transition: { duration: 0.3 } 
                        }}
                        layoutId={`card-${item.id}`}
                      >
                        {/* Company section */}
                        <div className="flex items-center p-5 pb-4 border-b border-white/5">
                          <div 
                            className="w-12 h-12 mr-4 rounded-sm flex items-center justify-center overflow-hidden bg-black/30"
                            style={{ 
                              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {item.logo ? (
                              <img 
                                src={item.logo} 
                                alt={`${item.company} logo`}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <span className="text-xl font-serif">{item.company.charAt(0)}</span>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium">{item.company}</h3>
                            <div className="flex items-center text-xs text-white/50">
                              <span>{item.location}</span>
                              <span className="mx-2">•</span>
                              <span>{item.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          {/* Title */}
                          <h4 className="text-xl md:text-2xl font-serif tracking-tight mb-4">{item.title}</h4>
                          
                          {/* Description with expand/collapse */}
                          <div className="mb-4">
                            {selectedId === item.id ? (
                              <motion.p 
                                className="text-white/70"
                                initial={{ height: '60px', overflow: 'hidden' }}
                                animate={{ height: 'auto', overflow: 'visible' }}
                                transition={{ duration: 0.5 }}
                              >
                                {item.description}
                              </motion.p>
                            ) : (
                              <p className="text-white/70 line-clamp-3">
                                {item.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Skills */}
                          {item.skills && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {(selectedId === item.id ? item.skills : item.skills.slice(0, 4)).map((skill, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-1 text-xs rounded-sm bg-white/5 text-white/60 border border-white/5"
                                >
                                  {skill}
                                </span>
                              ))}
                              {!selectedId && item.skills.length > 4 && (
                                <span className="px-2 py-1 text-xs rounded-sm bg-white/5 text-white/40">
                                  +{item.skills.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {/* Company link */}
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                          >
                            <span>Visit Company</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                        
                        {/* Decorative element */}
                        <div 
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{ 
                            background: `linear-gradient(to right, transparent, ${item.color || 'rgba(255, 255, 255, 0.1)'} 50%, transparent)`,
                            opacity: 0.3
                          }}
                        ></div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Show More/Less button */}
          {allExperiences.length > 2 && (
            <div className="mt-16 flex justify-center">
              <motion.button
                onClick={toggleShowAll}
                className="relative px-8 py-3 text-sm uppercase tracking-wider text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-colors"
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.2)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ y: 0 }}
              >
                <span className="relative z-10">
                  {showAllExperiences ? "Show Less" : "Show More"}
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/5"
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ 
                    width: '100%', 
                    opacity: 1,
                    transition: { duration: 0.4 } 
                  }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;