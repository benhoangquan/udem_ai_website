import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2023-12-01', // Use current UTC date - see "specifying API version"!
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

// Helper function for generating image URLs with only the asset reference data in your documents
export const urlFor = (source: any) => {
  return imageUrlBuilder(sanityClient).image(source);
}; 