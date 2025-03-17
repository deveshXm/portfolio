'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import HorizontalGallery from './HorizontalGallery';

// Define the project type for TypeScript
interface FeaturedProject {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
}

// Sample projects data
const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Editorial New Typeface",
    slug: "editorial-new",
    category: "Typography / Branding",
    image: "/projects/editorial-new.jpg"
  },
  {
    id: 2,
    title: "Pangram Pangram Website",
    slug: "pangram-pangram",
    category: "Web Design / Development",
    image: "/projects/pangram-pangram.jpg"
  },
  {
    id: 3,
    title: "Helvetica Now",
    slug: "helvetica-now",
    category: "Typography / Design System",
    image: "/projects/helvetica-now.jpg"
  },
  {
    id: 4,
    title: "Fashion Portfolio",
    slug: "fashion-portfolio",
    category: "Branding / Web Design",
    image: "/projects/fashion-portfolio.jpg"
  }
];

// Featured Project Component with asymmetric grid layout
function FeaturedProject({ project, index }: { project: FeaturedProject, index: number }) {
  return (
    <motion.div 
      className={`col-span-4 ${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} mb-16 md:mb-24`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link href={`/work/${project.slug}`} className="pp-project-card block cursor-pointer">
        <div className="pp-project-card-image aspect-[4/3] md:aspect-[16/10] overflow-hidden mb-6">
          {/* Replace with actual project image */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 text-black text-opacity-30">
            [Project Image]
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <p className="pp-text-micro text-text/50 mb-2">
              {project.category}
            </p>
            <h3 className="pp-text-xl md:pp-text-2xl font-serif tracking-tighter">
              {project.title}
            </h3>
          </div>
          
          <div className="text-2xl font-serif mt-1">→</div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function MotionMain() {
  // References for scroll-triggered animations
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    <main className="will-change-transform">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center pt-32 pb-28 md:pt-40 md:pb-40 overflow-hidden">
        <div className="pp-asymmetric-container">
          <div className="pl-0 md:pl-[10%]">
            <div className="hero-heading">
              <TextReveal 
                as="h1" 
                className="pp-text-6xl md:pp-text-8xl font-serif tracking-tightest max-w-[1200px] mb-6"
                delay={0.4}
              >
                Designer & Developer Crafting Digital Experiences
              </TextReveal>
            </div>
            
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <TextReveal 
                  as="p" 
                  className="pp-text-md md:pp-text-lg text-text/70 leading-relaxed max-w-[460px]"
                  delay={0.8}
                  stagger={0.01}
                >
                  I build thoughtful, memorable, and functional digital products that find the perfect balance between form and function.
                </TextReveal>
                
                <div className="mt-10">
                  <MagneticButton 
                    href="/work" 
                    cursorText="View"
                  >
                    View Work
                  </MagneticButton>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="pl-[10%] pt-[30%] relative">
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-accent opacity-20 animate-pulse"></div>
                  <div className="pp-text-micro text-text/50">Based in SF</div>
                  <div className="mt-6 h-[1px] w-16 bg-text/20"></div>
                </div>
              </div>
            </div>
          </div>
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
      
      {/* Featured Projects Gallery (Grid Layout) */}
      <HorizontalGallery projects={featuredProjects} />
      
      {/* Section transition */}
      <div className="h-20 md:h-40 bg-gradient-to-b from-background to-black"></div>
      
      {/* About Section */}
      <section className="py-32 bg-black text-white">
        <div className="pp-container">
          <div className="pp-grid">
            <div className="col-span-4 md:col-span-6">
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
                I'm a designer and developer with over 5 years of experience creating digital products for clients around the world.
              </TextReveal>
              
              <TextReveal 
                as="p" 
                className="pp-text-lg font-serif tracking-tight mb-12 text-white/80 max-w-[500px]"
                delay={0.4}
                stagger={0.01}
              >
                My approach combines strategic thinking, clean aesthetics, and robust functionality to create meaningful experiences that resonate with users.
              </TextReveal>
              
              <MagneticButton 
                href="/about" 
                dark={true}
                cursorText="About"
              >
                More About Me
              </MagneticButton>
            </div>
            
            <div className="col-span-4 md:col-span-5 md:col-start-8 mt-16 md:mt-0">
              <motion.div 
                className="relative aspect-[4/5] bg-white/10 overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  [Portrait Image]
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section transition */}
      <div className="h-20 md:h-40 bg-gradient-to-b from-black to-background"></div>
      
      {/* Contact Section */}
      <section className="py-32">
        <div className="pp-container">
          <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
            <TextReveal 
              as="h2" 
              className="pp-text-5xl md:pp-text-6xl font-serif tracking-tightest mb-10"
            >
              Let's create something amazing together
            </TextReveal>
            
            <TextReveal 
              as="p" 
              className="pp-text-lg text-text/70 mb-12 max-w-[600px]"
              delay={0.2}
            >
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life.
            </TextReveal>
            
            <MagneticButton 
              href="/contact" 
              cursorText="Contact"
            >
              Get in Touch
            </MagneticButton>
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