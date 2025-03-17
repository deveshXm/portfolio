'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';
import portfolioData from '../data/portfolio.json';

// Define the interface for experience timeline items
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  link: string;
  description: string;
  color: string;
  logo?: string; // Optional logo path
  skills?: string[]; // Added skills array
}

const WorkExperience = () => {
  const { experience } = portfolioData;
  const projects: ExperienceItem[] = experience.timeline;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-20 md:py-32 overflow-hidden relative bg-gradient-to-b from-black via-black/90 to-black">
      {/* Decorative elements */}
      <div className="absolute left-8 md:left-16 top-0 h-[30%] w-[1px] bg-white/5"></div>
      <div className="absolute right-8 md:right-16 bottom-0 h-[30%] w-[1px] bg-white/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02)_0%,transparent_60%)]"></div>
      
      <div className="pp-container mb-12 md:mb-20">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-4 md:col-span-6 relative">
            {/* Decorative elements */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
              <div className="rotate-90 origin-center">
                <span className="text-xs tracking-widest text-white/40 uppercase">Timeline</span>
                <span className="inline-block w-8 h-[1px] bg-white/20 ml-3 align-middle"></span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-lg font-serif">#</span>
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Professional Journey</div>
              </div>
              
              <h2 className="pp-text-4xl md:pp-text-5xl font-serif tracking-tight mb-4">Work Experience</h2>
              <p className="pp-text-lg text-text/70 mb-6 max-w-md">Key positions and roles throughout my professional career, showcasing growth and expertise.</p>
            </div>
            
            <div className="hidden md:block mt-8 space-y-4">
              <div className="w-full h-[1px] bg-white/10"></div>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/20"></span>
                  <span>AI Engineering</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/20"></span>
                  <span>Full-Stack Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive height container for experiences */}
      <div className="relative w-full min-h-[900px] sm:min-h-[950px] md:min-h-[980px] lg:min-h-[1000px] overflow-hidden py-10">
        {/* Fixed position timeline visualization - responsive positioning */}
        <div className="absolute right-4 lg:right-32 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="space-y-6">
            <div className="text-xs text-white/60 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
              <span>Career Timeline</span>
            </div>
            
            <div className="h-[350px] lg:h-[450px] w-[1px] bg-white/10 relative flex flex-col items-center">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="absolute w-4 h-4 -left-1.5 flex items-center justify-center cursor-pointer"
                  style={{ top: `${(index / (projects.length - 1)) * 100}%` }}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                >
                  <div className={`w-full h-full rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-100' 
                      : 'bg-white/30 scale-75 hover:scale-100 hover:bg-white/50'
                  }`}></div>
                  
                  {index === currentIndex && (
                    <div className="absolute -right-36 flex items-center gap-2 whitespace-nowrap">
                      <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                        {project.logo ? (
                          <img 
                            src={project.logo} 
                            alt={`${project.company} logo`}
                            className="w-3 h-3 object-contain"
                          />
                        ) : (
                          <div className="text-[8px] font-serif">{project.company.charAt(0)}</div>
                        )}
                      </div>
                      <div className="text-xs text-white/70">{project.company}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex flex-col items-end gap-4 mt-8">
              <div className="flex items-center gap-3">
                <button 
                  onClick={goToPrev} 
                  disabled={currentIndex === 0}
                  className={`group flex items-center gap-2 ${
                    currentIndex === 0 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:text-white cursor-pointer'
                  }`}
                  aria-label="Previous experience"
                >
                  <svg 
                    width="20" 
                    height="8" 
                    viewBox="0 0 20 8" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform duration-300 ${
                      currentIndex !== 0 ? 'group-hover:-translate-x-1' : ''
                    }`}
                  >
                    <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM20 3.5L1 3.5V4.5L20 4.5V3.5Z" fill="currentColor"/>
                  </svg>
                  <span className="text-xs uppercase tracking-wider">Prev</span>
                </button>
                
                <span className="text-xs text-white/30 mx-2">|</span>
                
                <button 
                  onClick={goToNext} 
                  disabled={currentIndex === projects.length - 1}
                  className={`group flex items-center gap-2 ${
                    currentIndex === projects.length - 1 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:text-white cursor-pointer'
                  }`}
                  aria-label="Next experience"
                >
                  <span className="text-xs uppercase tracking-wider">Next</span>
                  <svg 
                    width="20" 
                    height="8" 
                    viewBox="0 0 20 8" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform duration-300 ${
                      currentIndex !== projects.length - 1 ? 'group-hover:translate-x-1' : ''
                    }`}
                  >
                    <path d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              
              <div className="text-xs text-white/40 flex items-center gap-2">
                <span className="font-mono">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="w-10 h-[1px] bg-white/20"></span>
                <span className="font-mono">{String(projects.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className={`absolute inset-0 ${projects[currentIndex].color}`}
          >
            <div className="pp-container h-full flex items-center">
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
                {/* Content area with responsive dimensions */}
                <div className="col-span-4 md:col-span-6 md:col-start-2 flex items-center justify-center">
                  <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[600px] h-auto max-h-full md:max-h-[850px] flex flex-col justify-start">
                    {/* Company logo and position indicator - responsive sizing */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12 pt-6 sm:pt-8 md:pt-10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                          {/* Company logo or fallback */}
                          {projects[currentIndex].logo ? (
                            <img 
                              src={projects[currentIndex].logo} 
                              alt={`${projects[currentIndex].company} logo`}
                              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                            />
                          ) : (
                            <div className="text-xl sm:text-2xl font-serif">{projects[currentIndex].company.charAt(0)}</div>
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-white/80 font-medium">{projects[currentIndex].company}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="hidden sm:inline-block w-6 sm:w-8 md:w-10 h-[1px] bg-white/30 mr-2 sm:mr-3"></span>
                        <span className="text-xs sm:text-sm text-white/50 font-mono">{String(currentIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}</span>
                      </div>
                    </div>
                    
                    {/* Job title section - responsive height and spacing */}
                    <div className="mb-8 sm:mb-12 md:mb-16 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] max-h-none">
                      <h3 className="pp-text-3xl sm:pp-text-4xl md:pp-text-5xl font-serif tracking-tighter mb-4 sm:mb-6 md:mb-8">{projects[currentIndex].title}</h3>
                      
                      {/* Duration and location with responsive spacing */}
                      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:flex-row lg:items-center lg:gap-8">
                        <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm text-xs sm:text-sm border border-white/10 inline-block w-fit">
                          {projects[currentIndex].duration}
                        </div>
                        <div className="text-sm sm:text-base text-white/70 flex items-center">
                          <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/20 mr-2 sm:mr-3 flex items-center justify-center">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60"></span>
                          </span>
                          {projects[currentIndex].location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills and description - fully responsive sections */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-sm mb-8 md:mb-16 border border-white/10 flex-1">
                      {/* Description with responsive height */}
                      <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto">
                        <div className="text-xs uppercase tracking-wider text-white/50 mb-3 md:mb-6 sticky top-0 bg-gradient-to-b from-[#1a1a1a]/90 to-[#1a1a1a]/90 backdrop-blur-sm pb-2 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-1 z-10">Description</div>
                        <div className="text-base md:text-lg text-white/80 leading-relaxed">{projects[currentIndex].description}</div>
                      </div>
                      
                      {/* Skills tags with responsive spacing */}
                      <div className="p-4 sm:p-6 md:p-8 pt-5 sm:pt-6 md:pt-7 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] max-h-[200px] sm:max-h-[220px] md:max-h-[240px] overflow-y-auto">
                        <div className="text-xs uppercase tracking-wider text-white/50 mb-3 md:mb-6 sticky top-0 bg-gradient-to-b from-[#1a1a1a]/90 to-[#1a1a1a]/90 backdrop-blur-sm pb-2 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-1 z-10">Skills & Technologies</div>
                        <div className="flex flex-wrap gap-3 md:gap-5">
                          {projects[currentIndex].skills?.map((skill, idx) => (
                            <span key={idx} className="text-xs sm:text-sm md:text-base bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-sm text-white/70">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA button - responsive sizing */}
                    <div>
                      <a 
                        href={projects[currentIndex].link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-sm transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider gap-2 sm:gap-3 md:gap-4 group"
                        data-cursor-text="Visit"
                      >
                        <span>Visit {projects[currentIndex].company}</span>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="transform group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Mobile indicators - improved responsive design */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 md:hidden">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Progress bar */}
            <div className="w-[150px] sm:w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 transition-all duration-300"
                style={{ width: `${(currentIndex / (projects.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            {/* Company indicators - responsive sizing */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
              {projects.map((project, index) => (
                <button 
                  key={index} 
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`flex flex-col items-center gap-1 sm:gap-2 ${index === currentIndex ? 'opacity-100' : 'opacity-40'}`}
                  aria-label={`Go to ${project.company}`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                    index === currentIndex ? 'border-white/60' : ''
                  }`}>
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        alt={`${project.company} logo`}
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    ) : (
                      <div className="text-xs sm:text-sm font-serif">{project.company.charAt(0)}</div>
                    )}
                  </div>
                  {index === currentIndex && (
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-wide text-white/70 max-w-[60px] sm:max-w-[70px] text-center truncate">{project.company}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;