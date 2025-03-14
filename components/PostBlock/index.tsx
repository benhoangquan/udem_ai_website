import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

import defaultImage from "@/assets/images/default.jpg";

export const PostBlock = ({post}: { post: any}) => {
    // Function to get image URL from Sanity
    const getImageUrl = () => {
        if (post.mainImage) {
            try {
                // Use the urlFor helper to generate a proper URL from the Sanity image reference
                return urlFor(post.mainImage).width(800).height(600).url();
            } catch (error) {
                console.error("Error generating Sanity image URL:", error);
                return defaultImage;
            }
        }
        
        // Default image fallback
        return defaultImage;
    };

    // Generate URL for the post
    const getPostUrl = () => {
        if (!post.slug) return '/';
        
        // Handle both string slugs and Sanity slug objects
        const slug = typeof post.slug === 'string' 
            ? post.slug 
            : post.slug.current;
            
        return `/blog/${slug}`;
    };

    console.log(post);

    return (
        <div className="post-block p-2 rounded-md">
            <Link href={getPostUrl()}>
                <div className="relative h-80 transition-all duration-200 ease-linear hover:-translate-y-[3px]">
                    <Image
                        src={getImageUrl()}
                        fill
                        alt={post.title}
                        className="absolute rounded-md h-full w-full object-cover"
                    />
                </div>
            </Link>
            <Link href={getPostUrl()} className="post-content my-4">
                <h3 className="text-2xl py-4">{post.title}</h3>
                <div 
                    className="text-gray-300 mb-4"
                    dangerouslySetInnerHTML={{ __html: post.excerpt}}
                />
            </Link>
        </div>
    );
};