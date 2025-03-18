import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/utils/airtable';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Ensure params.slug is used in an async context
  const slug = params.slug;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Devesh Meena`,
    description: post.content.substring(0, 160) + '...',
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600; // Revalidate at most every hour

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Format date for display
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  
  return (
    <PageTransition>
      <div className="relative overflow-x-hidden min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          {/* Blog Post Header */}
          <section className="py-10 md:py-16 mb-8 md:mb-16 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
            <div className="absolute left-0 top-0 w-[30%] h-[1px] bg-white/5"></div>
            <div className="absolute right-0 bottom-0 w-[30%] h-[1px] bg-white/5"></div>
            
            <div className="pp-container">
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
                <div className="col-span-4 md:col-span-8 md:col-start-3">
                  {/* Back Link */}
                  <a 
                    href="/blogs" 
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-10 transition-colors relative z-10 cursor-pointer"
                    style={{ position: 'relative', zIndex: 50 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="pointer-events-auto">Back to Journal</span>
                  </a>
                  
                  {/* Post Date */}
                  <div className="pp-text-micro text-white/40 mb-4">
                    {formattedDate}
                  </div>
                  
                  {/* Post Title */}
                  <h1 className="pp-text-5xl md:pp-text-6xl font-serif tracking-tight mb-10">
                    {post.title}
                  </h1>
                  
                  {/* Optional External Link */}
                  {post.link && post.link.trim() !== '' && (
                    <a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 border-b border-white/20 pb-1 transition-colors cursor-pointer relative z-10"
                      style={{ position: 'relative', zIndex: 50 }}
                    >
                      <span className="pointer-events-auto">Original Source</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-auto">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog Post Content */}
          <section className="py-10">
            <div className="pp-container">
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
                <div className="col-span-4 md:col-span-8 md:col-start-3">
                  <article className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown>
                      {post.content}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
          </section>
          
          {/* Back to all posts link */}
          <section className="py-16">
            <div className="pp-container">
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
                <div className="col-span-4 md:col-span-8 md:col-start-3 flex justify-center">
                  <a
                    href="/blogs"
                    className="px-8 py-3 text-sm uppercase tracking-wider text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all inline-block relative z-10 cursor-pointer"
                    style={{ position: 'relative', zIndex: 50 }}
                  >
                    <span className="pointer-events-auto">Back to All Articles</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section transition with dotted pattern */}
          <div className="h-20 md:h-40 relative overflow-hidden mt-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}