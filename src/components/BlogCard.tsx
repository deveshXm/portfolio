'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BlogPost } from '@/utils/airtable';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/blogs/${post.slug}`);
  };
  
  // Format date for display
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  
  // Get a short excerpt from the content, around 100 characters
  const excerpt = post.content 
    ? post.content.substring(0, 120) + (post.content.length > 120 ? '...' : '') 
    : '';
  
  return (
    <a 
      href={`/blogs/${post.slug}`}
      className="block h-full"
      onClick={handleCardClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer h-full"
      >
        <div className="relative h-full p-6 border border-white/10 group-hover:border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>
          
          {/* Post date */}
          <div className="pp-text-micro text-white/40 mb-4">
            {formattedDate}
          </div>
          
          {/* Post title */}
          <h3 className="pp-text-2xl font-serif tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Post excerpt */}
          <p className="text-white/60 text-sm mb-6 line-clamp-3">
            {excerpt}
          </p>
          
          {/* Read more */}
          <div className="flex items-center text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300">
            <span className="mr-2">Read Article</span>
            <span className="relative w-12 h-[1px] bg-white/20 overflow-hidden">
              <motion.span 
                className="absolute inset-0 bg-white/50"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </div>
          
          {/* External link indicator if present */}
          {post.link && (
            <div className="absolute top-4 right-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/20 group-hover:text-white/40 transition-colors duration-300">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </motion.div>
    </a>
  );
}