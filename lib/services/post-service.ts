import { SanityPost } from '@/lib/types';
import * as queries from '@/lib/sanity/queries';

/**
 * Get all blog BlogPosts from Sanity
 */
export async function getSanityPosts(): Promise<SanityPost[]> {
  return queries.getAllPosts();
}

/**
 * Get a single post by its slug
 * @param slug Post slug
 */
export async function getSanityPostBySlug(slug: string): Promise<SanityPost | null> {
  return queries.getPostBySlug(slug);
}

/**
 * Get featured BlogPosts
 * @param limit Number of BlogPosts to return (default 3)
 */
export async function getSanityFeaturedPosts(limit = 3): Promise<SanityPost[]> {
  return queries.getFeaturedPosts(limit);
}

/**
 * Get BlogPosts by category
 * @param category Category name
 * @param limit Number of BlogPosts to return (default 10)
 */
export async function getSanityPostsByCategory(category: string, limit = 10): Promise<SanityPost[]> {
  return queries.getPostsByCategory(category, limit);
}

/**
 * Format a Sanity post for the UI
 * This function ensures all expected fields are available
 * @param post Sanity post object
 */
export function formatPostForDisplay(post: SanityPost): SanityPost {
  return {
    ...post,
    excerpt: post.excerpt || '',
    categories: post.categories || [],
    _type: post._type || 'post'
  };
} 