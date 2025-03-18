import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || 'appnDzerqN2009vBh');

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
 * Fetch all blog posts from Airtable
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const records = await base('tblP83FYWWvi41n6h')
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
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const records = await base('tblP83FYWWvi41n6h')
      .select({
        filterByFormula: `FIND("${slug}", LOWER(SUBSTITUTE(Title, " ", "-")))`,
      })
      .all();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];
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
    console.error('Error fetching blog post:', error);
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