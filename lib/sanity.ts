// This file is kept for backwards compatibility
// New code should import from the restructured modules

import { sanityClient, urlFor } from './sanity/client';
import { getAllPosts, getPostBySlug, getFeaturedPosts, getGeneralInfo } from './sanity/queries';

export { 
  sanityClient, 
  urlFor,
  getAllPosts,
  getPostBySlug,
  getFeaturedPosts,
  getGeneralInfo
}; 