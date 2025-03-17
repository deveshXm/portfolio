'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LandingAnimationProps {
  name: string;
}

export default function LandingAnimation({ name }: LandingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [showNavigation, setShowNavigation] = useState(false);

  // Split text into characters for animation
  useEffect(() => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const characters = name.split('');
    text.innerHTML = '';
    
    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block relative';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px) rotate(5deg)';
      text.appendChild(span);
      
      // Add subtle accent lines to random characters
      if (index === 1 || index === characters.length - 1) {
        const line = document.createElement('div');
        line.className = 'absolute -bottom-2 left-0 w-full h-[1px] bg-accent opacity-0';
        span.appendChild(line);
        
        gsap.to(line, {
          opacity: 0.7,
          width: '100%',
          duration: 1,
          delay: 2.5 + (index * 0.1),
          ease: 'power2.out'
        });
      }
    });
    
    // Initial animation - reveal text
    const spans = text.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      rotate: 0,
      stagger: 0.15,
      duration: 1.8,
      ease: 'power4.out',
      delay: 0.5,
      onComplete: () => {
        setTimeout(() => {
          setShowNavigation(true);
        }, 1200);
      }
    });
    
    // Mouse move effect - more pronounced and with perspective
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;
      
      // Add perspective to container
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          perspective: '1000px',
          duration: 0.8
        });
      }
      
      gsap.to(spans, {
        x: (i) => (i % 2 === 0 ? xPos * 0.8 : xPos * -0.5),
        y: (i) => (i % 3 === 0 ? yPos * 0.5 : yPos * -0.3),
        rotateX: yPos * 0.3,
        rotateY: xPos * 0.3,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    
    // Scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      gsap.to(spans, {
        y: scrollY * 0.4,
        opacity: 1 - (scrollY * 0.003),
        stagger: 0.03,
        duration: 0.5,
        ease: 'power1.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [name]);
  
  const navItems = [
    { name: 'Projects', delay: 0 },
    { name: 'About', delay: 0.1 },
    { name: 'Contact', delay: 0.2 }
  ];
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Main content with asymmetric layout */}
      <div className="relative z-10 flex flex-col w-full h-full">
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <h1 
              ref={textRef}
              className="text-[12vw] font-editorial font-thin tracking-tight text-white leading-none ml-[-5vw]"
            >
              {name}
            </h1>
            
            {/* Subtitle with delayed appearance */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="text-sm uppercase tracking-[0.3em] text-white opacity-70 mt-6 ml-[20vw]"
            >
              Digital Designer
            </motion.p>
          </motion.div>
        </div>
        
        {/* Navigation */}
        <AnimatePresence>
          {showNavigation && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-[5vh] left-0 right-0 flex justify-center gap-[5vw] z-20"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.8 + item.delay }}
                  className="group relative text-white opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-cormorant">
                    {item.name}
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%', left: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Abstract background elements - enhanced with more subtle elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-gradient-to-r from-[#0f0f0f] to-[#171717] rounded-full blur-md"
          animate={{ 
            x: [0, 20, -10, 0],
            y: [0, -10, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/3 w-[28vw] h-[28vw] bg-gradient-to-l from-[#1a1a1a] to-[#0c0c0c] rounded-full blur-md"
          animate={{ 
            x: [0, -30, 15, 0],
            y: [0, 20, -20, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[18vw] h-[18vw] bg-gradient-to-t from-[#151515] to-[#090909] rounded-full blur-sm"
          animate={{ 
            x: [0, 40, -20, 0],
            y: [0, -30, 10, 0],
            scale: [1, 1.3, 0.7, 1]
          }}
          transition={{ 
            duration: 32, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Additional subtle elements */}
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-[12vw] h-[12vw] bg-gradient-to-br from-[#131313] to-[#0b0b0b] rounded-full blur-sm"
          animate={{ 
            x: [0, -20, 10, 0],
            y: [0, 15, -10, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ 
            duration: 28, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>
      
      {/* Electric lime accent elements - more elements for fashion-forward look */}
      <motion.div 
        className="absolute bottom-[10vh] right-[10vw] w-[1px] h-[30vh] bg-accent"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '30vh', opacity: 0.7 }}
        transition={{ duration: 1.8, delay: 2 }}
      />
      <motion.div 
        className="absolute top-[15vh] left-[10vw] w-[20vw] h-[1px] bg-accent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '20vw', opacity: 0.7 }}
        transition={{ duration: 1.8, delay: 2.2 }}
      />
      <motion.div 
        className="absolute bottom-[25vh] left-[15vw] w-[1px] h-[15vh] bg-accent"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '15vh', opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 2.4 }}
      />
      <motion.div 
        className="absolute top-[30vh] right-[20vw] w-[10vw] h-[1px] bg-accent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '10vw', opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 2.6 }}
      />
      
      {/* Geometric accent */}
      <motion.div
        className="absolute bottom-[20vh] right-[25vw]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="w-[40px] h-[40px] border border-accent relative">
          <div className="absolute top-1/2 left-1/2 w-[5px] h-[5px] bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </motion.div>
    </div>
  );
}