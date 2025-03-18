import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || 'appnDzerqN2009vBh');

// Table ID constant for blog posts
const BLOG_TABLE_ID = 'tblP83FYWWvi41n6h';

// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  link?: string;
  date: string; // Using 'Date' field from Airtable
  slug: string;
}

/**
 * Count total blog posts in Airtable
 */
export async function countBlogPosts(): Promise<number> {
  try {
    const records = await base(BLOG_TABLE_ID)
      .select({
        fields: ['Title'], // Only fetch the title field for efficiency
      })
      .all();
      
    return records.length;
  } catch (error) {
    console.error('Error counting blog posts:', error);
    return 0;
  }
}

/**
 * Fetch blog posts with pagination
 */
export async function getBlogPosts(page: number = 1, postsPerPage: number = 6): Promise<BlogPost[]> {
  try {
    // Calculate the offset
    const offset = (page - 1) * postsPerPage;
    
    const records = await base(BLOG_TABLE_ID)
      .select({
        // Sort by the 'Date' field
        sort: [{ field: 'Date', direction: 'desc' }],
        pageSize: postsPerPage,
        offset: offset,
      })
      .all();

    return records.map((record) => {
      const title = record.get('Title') as string | undefined;
      return {
        id: record.id,
        title: title || 'Untitled Post',
        content: (record.get('Content') as string) || '',
        link: record.get('Blog Link') as string | undefined,
        date: (record.get('Date') as string) || new Date().toISOString(),
        slug: createSlug(title),
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch all blog posts from Airtable (for backwards compatibility)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const records = await base(BLOG_TABLE_ID)
      .select({
        // Sort by the 'Date' field
        sort: [{ field: 'Date', direction: 'desc' }],
      })
      .all();

    return records.map((record) => {
      const title = record.get('Title') as string | undefined;
      return {
        id: record.id,
        title: title || 'Untitled Post',
        content: (record.get('Content') as string) || '',
        link: record.get('Blog Link') as string | undefined,
        date: (record.get('Date') as string) || new Date().toISOString(),
        slug: createSlug(title),
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by record ID
 */
export async function getBlogPostById(recordId: string): Promise<BlogPost | null> {
  try {
    // Fetch the record directly by ID
    const record = await base(BLOG_TABLE_ID).find(recordId);
    
    if (!record) {
      return null;
    }
    
    const title = record.get('Title') as string | undefined;
    return {
      id: record.id,
      title: title || 'Untitled Post',
      content: (record.get('Content') as string) || '',
      link: record.get('Blog Link') as string | undefined,
      date: (record.get('Date') as string) || new Date().toISOString(),
      slug: createSlug(title),
    };
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    return null;
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Get all posts and find one with matching slug
    const allPosts = await getAllBlogPosts();
    const matchingPost = allPosts.find(post => post.slug === slug);
    
    if (matchingPost) {
      // We already have all the post data
      return matchingPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

/**
 * Create a slug from a title
 */
export function createSlug(title: string | null | undefined): string {
  if (!title) {
    return `post-${Date.now()}`; // Generate a timestamp-based slug if title is missing
  }
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}