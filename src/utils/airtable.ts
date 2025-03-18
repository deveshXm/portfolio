import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || 'appnDzerqN2009vBh');

// Table ID constant for blog posts - Hardcoded for simplicity
const BLOG_TABLE_ID = 'tblP83FYWWvi41n6h';

// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  link?: string;
  date: string;
  slug: string;
}

/**
 * Simple function to get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get all records from the blog posts table
    const records = await base(BLOG_TABLE_ID)
      .select({
        sort: [{ field: 'Date', direction: 'desc' }],
      })
      .all();

    // Map Airtable records to BlogPost objects
    return records.map((record) => {
      const title = record.get('Title') as string || 'Untitled Post';
      return {
        id: record.id,
        title: title,
        content: (record.get('Content') as string) || '',
        link: record.get('Blog Link') as string,
        date: (record.get('Date') as string) || new Date().toISOString(),
        slug: createSlug(title),
      };
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by its slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Get all posts and find the one with matching slug
    const allPosts = await getAllBlogPosts();
    const post = allPosts.find(post => post.slug === slug);
    
    return post || null;
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error);
    return null;
  }
}

/**
 * Get a specific blog post by its Airtable record ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Fetch the specific record by ID
    const record = await base(BLOG_TABLE_ID).find(id);
    
    if (!record) {
      return null;
    }
    
    const title = record.get('Title') as string || 'Untitled Post';
    return {
      id: record.id,
      title: title,
      content: (record.get('Content') as string) || '',
      link: record.get('Blog Link') as string,
      date: (record.get('Date') as string) || new Date().toISOString(),
      slug: createSlug(title),
    };
  } catch (error) {
    console.error('Failed to fetch blog post by ID:', error);
    return null;
  }
}

/**
 * Create a URL-friendly slug from a title
 */
export function createSlug(title: string): string {
  if (!title) {
    return `post-${Date.now()}`;
  }
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}