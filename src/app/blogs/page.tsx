import { Metadata } from 'next';
import { getAllBlogPosts } from '@/utils/airtable';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Blogs | Devesh Meena',
  description: 'Thoughts, articles and insights on AI, software engineering, and technology.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
};

export const revalidate = 3600; // Revalidate at most every hour

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  return (
    <PageTransition>
      <div className="relative overflow-x-hidden min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          {/* Blog Header Section */}
          <section className="py-10 md:py-16 mb-8 md:mb-16 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
            <div className="absolute left-0 top-0 w-[30%] h-[1px] bg-white/5"></div>
            <div className="absolute right-0 bottom-0 w-[30%] h-[1px] bg-white/5"></div>
            
            <div className="pp-container">
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
                <div className="col-span-4 md:col-span-6 md:col-start-2">
                  <h1 className="pp-text-5xl md:pp-text-6xl font-serif tracking-tight mb-6">Journal</h1>
                  <p className="pp-text-lg text-text/70 mb-8 max-w-xl">
                    Thoughts, articles and insights on AI, software engineering, and technology.
                  </p>
                </div>
                
                <div className="hidden md:block md:col-span-3 md:col-start-9">
                  <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h3 className="pp-text-micro mb-3">About the Journal</h3>
                    <p className="text-sm text-white/60 mb-4">
                      A collection of articles, insights and thoughts on AI, software engineering, and my journey in tech.
                    </p>
                    <div className="h-[1px] w-full bg-white/10 my-4"></div>
                    <div className="flex justify-between text-xs text-white/40">
                      <span>New posts weekly</span>
                      <span>{posts.length} articles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog Grid */}
          <section className="py-10">
            <div className="pp-container">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="pp-text-2xl font-serif tracking-tight mb-4">Coming Soon</h3>
                  <p className="text-white/60">
                    Articles are being crafted. Check back soon for new content.
                  </p>
                </div>
              )}
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