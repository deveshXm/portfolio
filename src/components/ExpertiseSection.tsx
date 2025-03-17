'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

interface ExpertiseSectionProps {
  skills: {
    specializations: string[];
    technologies: string[];
    expertise: {
      title: string;
      description: string;
    }[];
    projectTypes: {
      title: string;
      description: string;
    }[];
  };
}

const ExpertiseSection = ({ skills }: ExpertiseSectionProps) => {
  // State for active skill
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };
  
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-black">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-[50%] w-[1px] bg-white/5"></div>
      <div className="absolute right-0 bottom-0 h-[40%] w-[1px] bg-white/5"></div>
      <div className="absolute left-[5%] top-[10%] w-3 h-3 rounded-full border border-white/10"></div>
      <div className="absolute right-[15%] bottom-[15%] w-2 h-2 rounded-full bg-white/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.02)_0%,transparent_60%)]"></div>
      
      <div className="pp-container">
        <div className="flex flex-col md:flex-row mb-16 md:mb-24">
          <div className="md:w-1/3 mb-12 md:mb-0">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-sm font-serif">#</span>
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">My Skills</div>
              </div>
              
              <TextReveal
                as="h2"
                className="pp-text-3xl md:pp-text-4xl lg:pp-text-5xl font-serif tracking-tight mb-6"
              >
                Expertise & Skills
              </TextReveal>
              
              <TextReveal
                as="p"
                className="text-white/70 mb-10 max-w-md"
                delay={0.1}
              >
                Specialized in AI systems and full-stack development, with strong foundations in cloud architecture and RAG systems.
              </TextReveal>
              
              <div className="h-[1px] w-full bg-white/10 my-10"></div>
              
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-sm text-white/70 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-16">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {skills.expertise.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative group transition-all duration-300 border-l-2 ${
                    activeSkill === index ? 'border-white/50 pl-6' : 'border-white/10 pl-4'
                  }`}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border border-white/30 bg-black flex items-center justify-center group-hover:border-white/70 transition-all duration-300">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      activeSkill === index ? 'bg-white scale-125' : 'bg-white/50'
                    } group-hover:bg-white group-hover:scale-125 transition-all duration-300`}></div>
                  </div>
                  
                  <div className="py-4">
                    <h3 className={`text-xl md:text-2xl font-serif mb-4 transition-all duration-300 ${
                      activeSkill === index ? 'text-white' : 'text-white/80'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-6 max-w-lg">{item.description}</p>
                    
                    <div className={`h-[1px] w-12 transition-all duration-300 ${
                      activeSkill === index ? 'bg-white/50 w-24' : 'bg-white/10'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-24 pt-12 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-8">Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <span className="text-xl font-serif">{index + 1}</span>
                    </div>
                    <div className="pp-text-lg font-serif tracking-tighter">{spec}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20 group relative">
              <div className="absolute -left-4 -top-4 w-8 h-8 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -right-4 -bottom-4 w-8 h-8 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-sm font-medium mb-4 text-white/80">Project Types</h3>
                <div className="space-y-6">
                  {skills.projectTypes.map((type, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mt-1">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">{type.title}</h4>
                        <p className="text-xs text-white/50">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;