'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import portfolioData from '../data/portfolio.json';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const paintingRef = useRef<HTMLDivElement>(null);
  
  const { personal, skills, experience, images } = portfolioData;
  
  // Animation effect for the painting background
  useEffect(() => {
    if (!paintingRef.current) return;
    
    // Basic parallax effect on scroll
    const handleScroll = () => {
      if (!paintingRef.current) return;
      const scrollPos = window.scrollY;
      const scrollFactor = 0.15; // Adjust the parallax intensity
      
      gsap.to(paintingRef.current, {
        y: scrollPos * scrollFactor,
        scale: 1 + (scrollPos * 0.0003),
        duration: 0.5,
        ease: "power1.out"
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      id="hero-section"
      ref={heroRef} 
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-28 md:pt-40 md:pb-40 overflow-hidden"
    >
      {/* Classical Painting Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={paintingRef}
          className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]"
        >
          {/* Wanderer Above the Sea of Fog by Caspar David Friedrich - First layer */}
          <div className="w-full h-full bg-cover bg-center mix-blend-overlay"
               style={{ 
                 backgroundImage: `url("${images.backgroundImage}")`, 
                 filter: 'brightness(1.5) contrast(1.2) saturate(0.8)'
               }}>
          </div>
          
          {/* Second layer with different blend mode for depth */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-color-dodge opacity-20"
               style={{ 
                 backgroundImage: `url("${images.backgroundImage}")`, 
                 filter: 'brightness(0.8) contrast(1.5) saturate(0.4) blur(1px)'
               }}>
          </div>
          
          {/* Add vignette effect to make the painting more visible */}
          <div className="absolute inset-0" 
               style={{ 
                 boxShadow: 'inset 0 0 150px 60px rgba(10, 10, 10, 0.8)'
               }}>
          </div>
          
          {/* Subtle gradient overlays for text readability - further reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background/30"></div>
        </div>
      </div>
      
      {/* Subtle grid lines pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative h-full">
              <div className="absolute h-full w-[1px] right-0 bg-white/5"></div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative w-full">
              <div className="absolute w-full h-[1px] bottom-0 bg-white/5"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Hero Content */}
      <div className="pp-container relative z-10">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
          {/* Main heading - takes most of the width */}
          <div className="col-span-4 md:col-span-10 md:col-start-2">
            <div className="hero-heading">
              <TextReveal 
                as="h1" 
                className="pp-text-6xl md:pp-text-8xl font-serif tracking-tightest mb-3"
                delay={0.4}
              >
                Software Engineer
              </TextReveal>
              <TextReveal 
                as="h2" 
                className="pp-text-3xl md:pp-text-4xl font-serif tracking-tight text-white/80 mb-8"
                delay={0.6}
              >
                AI / Full Stack
              </TextReveal>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="col-span-1 hidden md:flex md:col-start-1 flex-col items-center">
            <div className="h-20 w-[1px] bg-white/10"></div>
            <div className="w-[5px] h-[5px] rounded-full bg-white/40"></div>
          </div>
          
          {/* Left content area with skills list */}
          <div className="col-span-4 md:col-span-5 md:col-start-2 mt-10 md:mt-16">
            <TextReveal 
              as="p" 
              className="pp-text-md md:pp-text-lg text-text/70 leading-relaxed max-w-[460px]"
              delay={0.8}
              stagger={0.01}
            >
              {personal.bio.short}
            </TextReveal>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="pp-text-micro mb-3 text-white/50">Specializations</h3>
                <ul className="text-sm space-y-2 text-white/70">
                  {skills.specializations.map((specialization, index) => (
                    <li key={index}>{specialization}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="pp-text-micro mb-3 text-white/50">Technologies</h3>
                <ul className="text-sm space-y-2 text-white/70">
                  {skills.technologies.map((technology, index) => (
                    <li key={index}>{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-10">
              <MagneticButton 
                href={personal.contact.calendly} 
                cursorText="Chat"
                className="backdrop-blur-sm bg-white/5 px-6 py-3 border border-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let's Connect
              </MagneticButton>
            </div>
          </div>
          
          {/* Right content area with stats */}
          <div className="col-span-4 md:col-span-4 md:col-start-8 mt-10 md:mt-16">
            <div className="p-8 border border-white/10 bg-white/5 backdrop-filter backdrop-blur-sm relative">
              <h3 className="pp-text-micro mb-6 text-white/50">Experience</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-serif mb-1">{experience.stats.companies}</div>
                  <div className="text-sm text-white/70">Companies</div>
                </div>
                
                <div>
                  <div className="text-3xl font-serif mb-1">{experience.stats.years}</div>
                  <div className="text-sm text-white/70">Years of Experience</div>
                </div>
                
                <div>
                  <div className="text-3xl font-serif mb-1">{experience.stats.specialization}</div>
                  <div className="text-sm text-white/70">Specialist</div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="pp-text-micro text-white/50">Based in {personal.location}</div>
                <div className="mt-2 h-[1px] w-16 bg-white/20"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="col-span-1 hidden md:block md:col-start-12 relative">
            <div className="absolute right-0 top-0 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements and decorative details */}
      <motion.div 
        className="absolute bottom-[20%] right-[15%] w-1 h-12 bg-white/40"
        animate={{ 
          height: ["30px", "50px", "30px"],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute top-[25%] left-[10%] w-16 h-[1px] bg-white/30"
        animate={{ 
          width: ["40px", "80px", "40px"],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-[30%] right-[25%] w-24 h-24 border border-white/10 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-[30%] left-[20%] w-3 h-3 bg-white/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Background text as decorative element */}
      <div className="absolute left-0 bottom-[15%] -rotate-90 origin-left opacity-5 select-none pointer-events-none hidden md:block">
        <span className="text-[120px] font-serif tracking-tighter">{personal.name.split(' ')[0].toUpperCase()}</span>
      </div>
      
      {/* Vertical "scroll" text with animated line */}
      <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 hidden md:flex flex-col items-center">
        <motion.div 
          className="h-20 w-[1px] bg-white/10 mb-4"
          animate={{
            height: ["60px", "90px", "60px"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <span className="text-xs tracking-widest text-white/30 rotate-90">SCROLL</span>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50">
        <div className="animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xs mt-2 tracking-widest text-text/50">SCROLL</span>
      </div>
    </section>
  );
}