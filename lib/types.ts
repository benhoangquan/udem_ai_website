// Sanity Schema Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface SanitySlug {
  current: string;
  _type: string;
}

export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

export interface SanityReference {
  _ref: string;
  _type: string;
}

export interface SanityAuthor extends SanityDocument {
  name: string;
  image?: SanityImage;
  bio?: any; // Portable Text
}

// Helper type guard function
export function isAuthorReference(author: SanityAuthor | SanityReference): author is SanityReference {
  return '_ref' in author && !('name' in author);
}

export function isFullAuthor(author: SanityAuthor | SanityReference): author is SanityAuthor {
  return 'name' in author;
}

export interface SanityPost extends SanityDocument {
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  author?: SanityAuthor | SanityReference;
  categories?: string[];
  publishedAt?: string;
  body?: any; // Portable Text
  relatedPosts?: SanityPost[] | SanityReference[];
  featured?: boolean;
  
  // Additional UI fields (not from Sanity)
  readingTimeMinutes?: number;
  viewCount?: number;
  formattedDate?: string;
}

// General Information Types
export interface SanityLocation {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  geoLocation?: {
    lat: number;
    lng: number;
  };
}

export interface SanityContactInfo {
  email?: string;
  phone?: string;
  website?: string;
}

export interface SanitySocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  discord?: string;
  github?: string;
}

export interface SanityMeetingInfo {
  regularSchedule?: string;
  location?: SanityLocation;
}

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface SanityGeneralInfo extends SanityDocument {
  title: string;
  mission?: any; // Portable Text
  vision?: any; // Portable Text
  meetingInfo?: SanityMeetingInfo;
  contact?: SanityContactInfo;
  socialMedia?: SanitySocialLinks;
  seo?: SanitySEO;
  logo?: SanityImage;
  gallery?: SanityImage[];
}

// UI Components Types
export interface PostProps {
  post: SanityPost;
}

export interface PostBlockProps {
  post: SanityPost;
}

// Activity Types
export interface SanitySchedule {
  startDateTime: string;
  endDateTime?: string;
  isRecurring?: boolean;
  recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
}

export interface SanityActivityLocation {
  type: 'in_person' | 'online' | 'hybrid';
  venue?: string;
  address?: string;
  meetingLink?: string;
}

export interface SanityCapacity {
  maxParticipants?: number;
  currentParticipants?: number;
  waitlistEnabled?: boolean;
}

export interface SanityResource {
  title: string;
  type: 'slides' | 'code' | 'document' | 'video' | 'other';
  url: string;
}

export interface SanityActivity extends SanityDocument {
  title: string;
  slug: SanitySlug;
  type: 'workshop' | 'hackathon' | 'study_group' | 'project_meeting' | 'social' | 'competition' | 'other';
  description?: any; // Portable Text
  mainImage?: SanityImage;
  schedule?: SanitySchedule;
  location?: SanityActivityLocation;
  organizers?: SanityReference[] | any[];
  capacity?: SanityCapacity;
  requirements?: string[];
  resources?: SanityResource[];
  status?: 'planned' | 'open' | 'full' | 'in_progress' | 'completed' | 'cancelled';
  tags?: string[];
}

export interface SanityResourceCategory {
  name: string;
  _type: string;
}

export interface SanityResourceContent {
  type: 'document' | 'video' | 'code' | 'link' | 'file';
  title: string;
  description?: string;
  url: string;
  file?: {
    asset: SanityReference;
  };
}

export interface SanityResource extends SanityDocument {
  title: string;
  slug: SanitySlug;
  category: SanityResourceCategory;
  description?: any; // Portable Text
  content?: SanityResourceContent[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  contributors?: SanityReference[] | any[];
  relatedResources?: SanityReference[] | SanityResource[];
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
} 