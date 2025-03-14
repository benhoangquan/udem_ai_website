import { sanityClient } from './client';
import { SanityPost, SanityActivity } from '../types';

/**
 * Get all blog posts
 * @returns Promise with array of posts
 */
export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      excerpt,
      mainImage, 
      "author": author->{_id, _type, name, image, bio},
      categories,
      publishedAt,
      body
    }`
  );
}

/**
 * Get a single post by its slug
 * @param slug The post slug
 * @returns Promise with a single post or null
 */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      mainImage,
      "author": author->{_id, _type, name, image, bio},
      categories,
      publishedAt,
      body,
      "relatedPosts": relatedPosts[]->{
        _id,
        _type,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt
      }
    }`,
    { slug }
  );
}

/**
 * Get featured posts
 * @param limit Number of posts to return
 * @returns Promise with array of featured posts
 */
export async function getFeaturedPosts(limit = 3): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0...${limit}]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      mainImage,
      "author": author->{_id, _type, name, image, bio},
      categories,
      publishedAt
    }`
  );
}

/**
 * Get posts by category
 * @param category Category to filter by
 * @param limit Number of posts to return
 * @returns Promise with array of posts in the category
 */
export async function getPostsByCategory(category: string, limit = 10): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && $category in categories] | order(publishedAt desc)[0...${limit}]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      mainImage,
      "author": author->{_id, _type, name, image, bio},
      categories,
      publishedAt
    }`,
    { category }
  );
}

/**
 * Get general information about the club
 * @returns Promise with general information data
 */
export async function getGeneralInfo() {
  return sanityClient.fetch(
    `*[_type == "generalInfo"][0]{
      title,
      mission,
      vision,
      meetingInfo {
        regularSchedule,
        location
      },
      contact,
      socialMedia,
      seo,
      logo,
      gallery
    }`
  );
}

/**
 * Get all activities
 * @returns Promise with array of activities
 */
export async function getAllActivities(): Promise<SanityActivity[]> {
  return sanityClient.fetch(
    `*[_type == "activity"] | order(schedule.startDateTime desc) {
      _id,
      _type,
      title,
      slug,
      type,
      description,
      mainImage,
      schedule {
        startDateTime,
        endDateTime,
        isRecurring,
        recurrencePattern
      },
      location {
        type,
        venue,
        address,
        meetingLink
      },
      "organizers": organizers[]->{_id, _type, name, image},
      capacity,
      requirements,
      resources,
      status,
      tags
    }`
  );
}

/**
 * Get a single activity by its slug
 * @param slug The activity slug
 * @returns Promise with a single activity or null
 */
export async function getActivityBySlug(slug: string): Promise<SanityActivity | null> {
  return sanityClient.fetch(
    `*[_type == "activity" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      type,
      description,
      mainImage,
      schedule {
        startDateTime,
        endDateTime,
        isRecurring,
        recurrencePattern
      },
      location {
        type,
        venue,
        address,
        meetingLink
      },
      "organizers": organizers[]->{_id, _type, name, image},
      capacity,
      requirements,
      resources,
      status,
      tags
    }`,
    { slug }
  );
} 