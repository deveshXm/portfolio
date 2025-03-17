'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

// Featured Project Component
function FeaturedProject({ project, index }: { project: FeaturedProject, index: number }) {
  return (
    <motion.div 
      className="col-span-4 md:col-span-6 mb-12 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative aspect-[16/10] bg-black bg-opacity-5 mb-4 overflow-hidden">
          {/* Replace with actual project image */}
          <div className="absolute inset-0 flex items-center justify-center text-black text-opacity-30">
            [Project Image]
          </div>
          
          <div className="absolute inset-0 bg-accent bg-opacity-0 transition-colors duration-300 group-hover:bg-opacity-10" />
        </div>
        
        <h3 className="pp-text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="pp-text-md text-black text-opacity-70 mt-1">
          {project.category}
        </p>
      </Link>
    </motion.div>
  );
}

export default function MotionMain() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="pp-container">
          <motion.h1 
            className="pp-text-5xl md:pp-text-6xl font-medium tracking-tighter max-w-[900px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Designer & developer crafting intentional digital experiences
          </motion.h1>
          
          <motion.p 
            className="pp-text-lg md:pp-text-xl mt-8 max-w-[560px] text-black text-opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I build thoughtful, memorable, and functional digital products that perfectly balance form and function.
          </motion.p>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/work" 
              className="inline-flex items-center px-8 py-4 bg-black text-white text-sm hover:bg-accent transition-colors"
            >
              View Work
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="py-20 bg-black bg-opacity-5">
        <div className="pp-container">
          <h2 className="pp-text-3xl font-medium tracking-tighter mb-12">Selected Work</h2>
          
          <div className="pp-grid">
            {featuredProjects.map((project, index) => (
              <FeaturedProject 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/work" 
              className="inline-flex items-center justify-center text-sm text-black hover:text-accent transition-colors"
            >
              View All Projects
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20">
        <div className="pp-container">
          <div className="pp-grid">
            <div className="col-span-4 md:col-span-5">
              <h2 className="pp-text-3xl font-medium tracking-tighter mb-8">About Me</h2>
              <p className="pp-text-lg mb-4 text-black text-opacity-70">
                I'm a designer and developer with over 5 years of experience creating digital products for clients around the world.
              </p>
              <p className="pp-text-lg mb-6 text-black text-opacity-70">
                My approach combines strategic thinking, clean aesthetics, and robust functionality to create meaningful experiences that resonate with users.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center text-sm text-black hover:text-accent transition-colors"
              >
                More About Me
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="col-span-4 md:col-span-6 md:col-start-7 mt-8 md:mt-0">
              <div className="relative aspect-[4/5] bg-black/5">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-black/30">
                  [Portrait Image]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-black bg-opacity-5">
        <div className="pp-container text-center">
          <h2 className="pp-text-3xl md:pp-text-4xl font-medium tracking-tighter mb-6 max-w-[800px] mx-auto">
            Let's create something amazing together
          </h2>
          <p className="pp-text-lg mb-12 text-black text-opacity-70 max-w-[600px] mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 bg-black text-white text-sm hover:bg-accent transition-colors"
          >
            Get in Touch
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}