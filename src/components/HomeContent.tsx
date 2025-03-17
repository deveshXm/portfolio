'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import FeaturedGrid from './Featured';
import WorkExperience from './WorkExperience';
import HeroSection from './HeroSection';
import ExpertiseSection from './ExpertiseSection';
import portfolioData from '../data/portfolio.json';

export default function HomeContent() {
  // References for scroll-triggered animations
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { 
    personal, 
    projects, 
    skills, 
    experience, 
    contact, 
    social, 
    images
  } = portfolioData;
  
  // Basic animation setup
  useEffect(() => {
    // Setup animations with your ScrollTrigger configuration here
    // but keep it simple for now
    
    return () => {
      // Clean up
      if (typeof window !== 'undefined' && gsap.globalTimeline) {
        gsap.globalTimeline.clear();
        // If ScrollTrigger is imported, use this:
        // ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);
  
  return (
    <main className="will-change-transform overflow-hidden">
      {/* Enhanced Hero Section with Classical Painting */}
      <HeroSection />
      
      {/* Traditional Gallery */}
      <FeaturedGrid projects={projects.featured} />
      
      {/* Horizontal scroll section */}
      <WorkExperience />
      
      {/* Expertise Section */}
      <ExpertiseSection skills={skills} />
      
      {/* Marquee Section */}
      <section className="py-20 md:py-28 overflow-hidden relative">
        <div className="relative w-full overflow-hidden py-20 md:py-24 border-t border-b border-white/10">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Marquee animation with refined styling */}
          <div className="whitespace-nowrap inline-block animate-marquee">
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">AI</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Engineering</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Development</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Cloud</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">TypeScript</span>
          </div>
          <div className="absolute top-0 left-0 whitespace-nowrap inline-block animate-marquee2">
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">AI</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Engineering</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Development</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">Cloud</span>
            <span className="text-7xl md:text-9xl font-serif tracking-tighter text-white/5 mx-4 hover:text-white/10 transition-colors duration-300">TypeScript</span>
          </div>
          
          {/* Overlay elements */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-full w-24 h-24">
              <span className="text-sm uppercase tracking-widest text-white/50">Scroll</span>
              <motion.div 
                className="mt-2 w-6 h-[1px] bg-white/30"
                animate={{ width: ["16px", "24px", "16px"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced About Section */}
      <section id="about-section" className="py-40 md:py-52 text-white relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute right-0 top-[20%] w-[1px] h-[40%] bg-white/5"></div>
        <div className="absolute left-[20%] bottom-0 w-[30%] h-[1px] bg-white/5"></div>
        
        <div className="pp-container">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8 relative">
            {/* Section label */}
            <div className="absolute -left-4 top-0 hidden md:block">
              <div className="rotate-90 origin-left">
                <span className="text-xs tracking-widest text-white/30 uppercase">About</span>
                <span className="inline-block w-16 h-[1px] bg-white/20 ml-4 align-middle"></span>
              </div>
            </div>
            
            {/* Left content column */}
            <div className="col-span-4 md:col-span-5">
              <TextReveal 
                as="h2" 
                className="pp-text-4xl font-serif tracking-tightest mb-10 text-white"
              >
                About Me
              </TextReveal>
              
              <TextReveal 
                as="p" 
                className="pp-text-lg font-serif tracking-tight mb-6 text-white/80 max-w-[500px]"
                delay={0.2}
                stagger={0.01}
              >
                {personal.bio.long.split('. ')[0] + '.'}
              </TextReveal>
              
              <TextReveal 
                as="p" 
                className="pp-text-lg font-serif tracking-tight mb-12 text-white/80 max-w-[500px]"
                delay={0.4}
                stagger={0.01}
              >
                {personal.bio.long.split('. ').slice(1).join('. ')}
              </TextReveal>
              
              {/* Career highlights */}
              <div className="mt-12 mb-12 space-y-8">
                <h3 className="pp-text-micro text-white/50 mb-6">Career Highlights</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Education</div>
                    <ul className="text-xs text-white/60 space-y-1">
                      {experience.education.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Core Skills</div>
                    <ul className="text-xs text-white/60 space-y-1">
                      {skills.coreSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <MagneticButton 
                href={social.linkedin}
                cursorText="Connect"
                className="backdrop-blur-sm bg-white/5 px-6 py-3 border border-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                More About Me
              </MagneticButton>
            </div>
            
            {/* Image and testimonial column */}
            <div className="col-span-4 md:col-span-6 md:col-start-7 mt-16 md:mt-0 relative">
              <motion.div 
                className="relative aspect-[4/5] border border-white/10 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Portrait image */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="relative flex-1 overflow-hidden">
                    <img 
                      src={images.portrait} 
                      alt={`${personal.name} Portrait`} 
                      className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 mix-blend-overlay"></div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20"></div>
                  </div>
                  
                  {/* Caption */}
                  <div className="bg-black/50 backdrop-blur-sm py-2 px-4 text-center">
                    <p className="text-xs text-white/80 italic">At OpenAI Dev Day, New Delhi, 2025</p>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </section>
      
      {/* Section transition with dotted pattern */}
      <div className="h-20 md:h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Enhanced Contact Section with asymmetric layout */}
      <section id="contact-section" className="py-32 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03)_0%,transparent_50%)]"></div>
        <div className="absolute right-[10%] top-0 w-[1px] h-[30%] bg-white/5"></div>
        <div className="absolute left-0 bottom-[20%] w-[40%] h-[1px] bg-white/5"></div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute right-[5%] top-[30%] w-24 h-24 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="pp-container">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
            {/* Section label */}
            <div className="col-span-4 md:col-span-12 mb-16">
              <div className="flex items-center">
                <span className="text-xs uppercase tracking-widest text-white/40">Contact</span>
                <span className="ml-4 h-[1px] w-16 bg-white/10"></span>
              </div>
            </div>
            
            {/* Main content */}
            <div className="col-span-4 md:col-span-7">
              <TextReveal 
                as="h2" 
                className="pp-text-5xl md:pp-text-6xl font-serif tracking-tightest mb-10"
              >
                {contact.cta}
              </TextReveal>
              
              <TextReveal 
                as="p" 
                className="pp-text-lg font-serif tracking-tighter text-white/70 mb-12 max-w-[600px]"
                delay={0.2}
              >
                {contact.message}
              </TextReveal>
              
              {/* Project types */}
              <div className="mt-12 mb-16 grid grid-cols-2 md:grid-cols-3 gap-6">
                {skills.projectTypes.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                    </div>
                    <h3 className="text-sm font-medium">{type.title}</h3>
                    <p className="text-xs text-white/50">{type.description}</p>
                  </div>
                ))}
              </div>
              
              <MagneticButton 
                href={`mailto:${personal.contact.email}`}
                cursorText="Email"
                className="backdrop-blur-sm bg-white/5 px-6 py-3 border border-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get in Touch
              </MagneticButton>
            </div>
            
            {/* Contact details card */}
            <div className="col-span-4 md:col-span-4 md:col-start-9 mt-16 md:mt-0">
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white/5 transition-opacity duration-1000 pointer-events-none"></div>
                
                {/* Grid pattern in the background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>
                
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 pointer-events-none"></div>
                
                <h3 className="pp-text-micro mb-6 relative z-10 text-white/70">Contact Details</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center border border-white/10 rounded-full mr-4 mt-1">
                      <span className="text-[10px] text-white/70">@</span>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 mb-1">Email</div>
                      <a 
                        href={`mailto:${personal.contact.email}`}
                        className="text-sm text-white/90 hover:text-white transition-colors duration-300 relative z-10 pp-reveal-line"
                        data-cursor-text="Email"
                      >
                        {personal.contact.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center border border-white/10 rounded-full mr-4 mt-1">
                      <span className="text-[10px] text-white/70">📍</span>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 mb-1">Based in</div>
                      <div className="text-sm text-white/90">{personal.location}</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <div className="text-xs text-white/40 mb-4">Connect</div>
                  <div className="flex gap-4 relative z-10">
                    <a href={social.github} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-sm" data-cursor-text="GH">GH</a>
                    <a href={social.linkedin} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-sm" data-cursor-text="Li">Li</a>
                    <a href={social.twitter} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-sm" data-cursor-text="X">X</a>
                  </div>
                </div>
              </div>
              
              {/* Availability indicator */}
              <div className="mt-6 flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span className="text-xs text-white/50">{personal.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add custom styles for improved scrolling and transitions */}
      <style jsx global>{`
        /* Prevent layout thrashing with containment */
        .contain-layout {
          contain: layout;
        }
        
        /* Ensure smooth transitions */
        html {
          scroll-behavior: smooth;
        }
        
        /* For intersection observer animations */
        @media (prefers-reduced-motion: no-preference) {
          .fade-in {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1.2s ease-out, transform 1.2s ease-out;
          }
          
          .fade-in.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}