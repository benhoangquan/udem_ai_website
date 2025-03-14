import { SanityPost, SanitySlug } from "@/lib/types";

/**
 * Generate a URL for a blog post
 * @param post SanityPost object or slug string/object
 * @returns URL string for the post
 */
export function getBlogPostUrl(post: SanityPost | SanitySlug | string | undefined | null): string {
  if (!post) return '/blog';
  
  // Handle different types of inputs
  if (typeof post === 'string') {
    return `/blog/${post}`;
  }
  
  // Handle Sanity slug object
  if ('current' in post) {
    return `/blog/${post.current}`;
  }
  
  // Handle full post object
  if ('slug' in post && post.slug) {
    return `/blog/${post.slug.current}`;
  }
  
  return '/blog';
}

/**
 * Generate a URL-friendly slug from a string
 * @param text String to convert to a slug
 * @returns Slug string
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    .trim();                  // Trim leading/trailing whitespace
} 