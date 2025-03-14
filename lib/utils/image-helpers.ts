import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/lib/types";

// Default image path that will be used as fallback
const DEFAULT_IMAGE_PATH = "/assets/images/default.jpg";

/**
 * Generate an image URL from a Sanity image reference
 * @param image SanityImage object
 * @param width Optional width for the image
 * @param height Optional height for the image
 * @returns URL string for the image
 */
export function getSanityImageUrl(
  image: SanityImage | undefined | null,
  width = 800,
  height = 600
): string {
  if (!image) return DEFAULT_IMAGE_PATH;

  try {
    return urlFor(image).width(width).height(height).url();
  } catch (error) {
    console.error("Error generating Sanity image URL:", error);
    return DEFAULT_IMAGE_PATH;
  }
}

/**
 * Generate placeholder blur data URL for an image
 * @param image SanityImage object
 * @returns Blurred small image URL for use with Next.js Image component
 */
export function getImagePlaceholder(image: SanityImage | undefined | null): string {
  if (!image) return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

  try {
    return urlFor(image).width(20).height(20).blur(10).url();
  } catch (error) {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  }
} 