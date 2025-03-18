import Link from "next/link";
import Image from "next/image";
import { PostBlockProps } from "@/lib/types";
import { getSanityImageUrl } from "@/lib/utils/image-helpers";
import { getBlogPostUrl } from "@/lib/utils/url-helpers";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const PostBlock = ({ post }: PostBlockProps) => {
    return (
        <Card className="h-full overflow-hidden hover:shadow-md transition-all">
            <Link href={getBlogPostUrl(post)} className="block">
                <div className="relative w-full h-60 overflow-hidden">
                    <Image
                        src={getSanityImageUrl(post.mainImage)}
                        fill
                        alt={post.title}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </Link>
            <CardContent className="p-5">
                <Link href={getBlogPostUrl(post)} className="block">
                    <CardTitle className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                    </CardTitle>
                    <CardDescription 
                        className={cn(
                            "line-clamp-3 text-gray-600",
                            post.excerpt ? "block" : "hidden"
                        )}
                        dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                    />
                    {post.publishedAt && (
                        <p className="text-sm text-gray-500 mt-4">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </p>
                    )}
                </Link>
            </CardContent>
        </Card>
    );
}; 