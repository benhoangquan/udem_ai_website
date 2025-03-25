import Link from "next/link";
import Image from "next/image";
import { PostBlockProps } from "@/lib/types";
import { getSanityImageUrl } from "@/lib/utils/image-helpers";
import { getBlogPostUrl } from "@/lib/utils/url-helpers";
import { Card, CardContent, CardTitle, CardDescription, CardBar } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export const PostBlock = ({ post }: PostBlockProps) => {
    // Determine if post is featured to set different appearance
    const isFeatured = post.featured;
    
    return (
        <Card 
            variant={isFeatured ? "default" : "outline"}
            size="md" 
            className="h-full overflow-hidden hover:shadow-md transition-all"
        >
            <Link href={getBlogPostUrl(post)} className="block">
                <div className="relative w-full h-60 overflow-hidden">
                    <Image
                        src={getSanityImageUrl(post.mainImage)}
                        fill
                        alt={post.title}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {isFeatured && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded">
                            Featured
                        </div>
                    )}
                </div>
            </Link>
            <CardContent className="p-5">
                <CardBar 
                    colorScheme={isFeatured ? "primary" : "default"} 
                    size="sm" 
                    className="mb-3"
                />
                <Link href={getBlogPostUrl(post)} className="block">
                    <CardTitle 
                        colorScheme="default"
                        size="md"
                        className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors"
                    >
                        {post.title}
                    </CardTitle>
                    <CardDescription 
                        colorScheme="muted"
                        size="sm"
                        className={cn(
                            "line-clamp-3",
                            post.excerpt ? "block" : "hidden"
                        )}
                        dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                    />
                    {post.publishedAt && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                            <Clock size={14} className="mr-1" />
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </time>
                        </div>
                    )}
                </Link>
            </CardContent>
        </Card>
    );
}; 