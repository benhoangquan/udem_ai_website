import { SanityPost } from '@/lib/types';
import { 
  getSanityPostBySlug, 
  getSanityPosts, 
  getSanityPostsByCategory,
  formatPostForDisplay 
} from '@/lib/services/post-service';

/**
 * Controller for blog-related functionality
 * This centralizes blog logic and can be reused across different routes
 */
export class BlogController {
  /**
   * Get a single post with additional processing
   */
  static async getPostDetail(slug: string): Promise<SanityPost | null> {
    const post = await getSanityPostBySlug(slug);
    
    if (!post) return null;
    
    // Apply any post-processing to the post
    const processedPost = {
      ...formatPostForDisplay(post),
      // Add view count, reading time estimate, etc.
      readingTimeMinutes: this.calculateReadingTime(post),
    };
    
    return processedPost;
  }
  
  /**
   * Get all blog posts for paths generation
   */
  static async getAllPostSlugs(): Promise<{ slug: string }[]> {
    const posts = await getSanityPosts();
    return posts.map(post => ({ 
      slug: post.slug.current 
    }));
  }
  
  /**
   * Calculate estimated reading time
   */
  private static calculateReadingTime(post: SanityPost): number {
    // Simple example: estimate based on content length
    // In real implementation, you'd parse the portable text and count words
    const wordCount = post.excerpt?.split(/\s+/).length || 0;
    const wordsPerMinute = 200;
    
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
} 