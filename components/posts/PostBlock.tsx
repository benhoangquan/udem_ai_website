import Link from "next/link";
import Image from "next/image";
import { PostBlockProps } from "@/lib/types";
import { getSanityImageUrl } from "@/lib/utils/image-helpers";
import { getBlogPostUrl } from "@/lib/utils/url-helpers";
import defaultImage from "@/assets/images/default.jpg";

export const PostBlock = ({ post }: PostBlockProps) => {
    return (
        <div className="post-block p-2 rounded-md">
            <Link href={getBlogPostUrl(post)}>
                <div className="relative h-80 transition-all duration-200 ease-linear hover:-translate-y-[3px]">
                    <Image
                        src={getSanityImageUrl(post.mainImage)}
                        fill
                        alt={post.title}
                        className="absolute rounded-md h-full w-full object-cover"
                    />
                </div>
            </Link>
            <Link href={getBlogPostUrl(post)} className="post-content my-4">
                <h3 className="text-2xl py-4">{post.title}</h3>
                <div 
                    className="text-gray-300 mb-4"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                />
            </Link>
        </div>
    );
}; 