import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from './types';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2023-12-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// Create a Sanity client for fetching data
export const sanityClient = createClient(config);

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient);

/**
 * Helper function to build image URLs from Sanity image references
 * @param source The Sanity image reference
 * @returns An image URL builder object
 */
export function urlForImage(source: SanityImage | any) {
  return builder.image(source);
} 