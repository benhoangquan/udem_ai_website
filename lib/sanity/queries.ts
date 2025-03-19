import { sanityClient } from './client';
import { SanityPost, SanityActivity, SanityResource, SanityMember } from '../types';

/**
 * Get all blog BlogPosts
 * @returns Promise with array of BlogPosts
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
 * Get featured BlogPosts
 * @param limit Number of BlogPosts to return
 * @returns Promise with array of featured BlogPosts
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
 * Get BlogPosts by category
 * @param category Category to filter by
 * @param limit Number of BlogPosts to return
 * @returns Promise with array of BlogPosts in the category
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

/**
 * Get all resources or with limit
 * @param limit Optional limit for the number of resources to return
 * @returns Promise with array of resources
 */
export async function getAllResources(limit?: number): Promise<SanityResource[]> {
  const limitQuery = limit ? `[0...${limit}]` : '';
  return sanityClient.fetch(
    `*[_type == "resource"] | order(publishedAt desc) ${limitQuery} {
      _id,
      _type,
      title,
      slug,
      category->{name, _type},
      description,
      content,
      difficulty,
      tags,
      "contributors": contributors[]->{_id, _type, name, image},
      "relatedResources": relatedResources[]->{
        _id,
        _type,
        title,
        slug,
        category->{name, _type},
        difficulty
      },
      publishedAt,
      updatedAt,
      featured
    }`
  );
}

/**
 * Get featured resources
 * @param limit Optional limit for the number of resources to return
 * @returns Promise with array of featured resources
 */
export async function getFeaturedResources(limit = 6): Promise<SanityResource[]> {
  return sanityClient.fetch(
    `*[_type == "resource" && featured == true] | order(publishedAt desc) [0...${limit}] {
      _id,
      _type,
      title,
      slug,
      category->{name, _type},
      description,
      difficulty,
      tags,
      "contributors": contributors[]->{_id, _type, name, image},
      publishedAt,
      updatedAt,
      featured
    }`
  );
}

/**
 * Get a resource by slug
 * @param slug The resource slug
 * @returns Promise with a single resource or null
 */
export async function getResourceBySlug(slug: string): Promise<SanityResource | null> {
  return sanityClient.fetch(
    `*[_type == "resource" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      category->{name, _type},
      description,
      content,
      difficulty,
      tags,
      "contributors": contributors[]->{_id, _type, name, image},
      "relatedResources": relatedResources[]->{
        _id,
        _type,
        title,
        slug,
        category->{name, _type},
        difficulty
      },
      publishedAt,
      updatedAt,
      featured
    }`,
    { slug }
  );
}

/**
 * Get all executive members
 * @returns Promise with array of executive members
 */
export async function getAllExecutiveMembers(): Promise<SanityMember[]> {
  return sanityClient.fetch(
    `*[_type == "member" && role == "executive" && status == "active"] | order(joinDate desc) {
      _id,
      _type,
      name,
      slug,
      email,
      role,
      executivePosition,
      avatar,
      bio,
      skills,
      socialLinks,
      joinDate
    }`
  );
} 