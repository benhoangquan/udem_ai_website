// This file is kept for backwards compatibility
// New code should import from the restructured modules

import { 
  getSanityPosts, 
  getSanityPostBySlug, 
  getSanityFeaturedPosts, 
  formatPostForDisplay 
} from './services/post-service';

// Re-export new functions
export { 
  getSanityPosts, 
  getSanityPostBySlug, 
  getSanityFeaturedPosts
};

// Legacy function name kept for compatibility
export const convertSanityPostFormat = formatPostForDisplay;