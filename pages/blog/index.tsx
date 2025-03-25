import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { SanityPost } from "@/lib/types";
import { PostBlock } from "@/components/BlogPosts/PostBlock";
import { getSanityPosts, formatPostForDisplay } from "@/lib/services/post-service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardBar, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPageProps {
  posts: SanityPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <CardTitle 
            colorScheme="default"
            size="lg"
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Our Blog
          </CardTitle>
          <CardBar colorScheme="primary" size="md" className="mb-8" />
          <CardDescription 
            colorScheme="muted"
            size="md"
            className="text-lg text-center max-w-3xl"
          >
            Stay up to date with the latest news, tutorials, and insights from our community.
          </CardDescription>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post) => (
                <PostBlock key={post._id} post={post} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            <Card variant="ghost" className="mt-12">
              <CardContent className="flex justify-center items-center space-x-2">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="icon"
                  className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </Button>
                
                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      onClick={() => paginate(number)}
                      variant={currentPage === number ? "default" : "outline"}
                      size="sm"
                      className={currentPage === number ? "bg-blue-600 text-white" : ""}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                
                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="icon"
                  className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card variant="outline" className="text-center py-16">
            <CardContent>
              <CardDescription colorScheme="muted" size="md" className="text-xl">
                No blog posts found.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  try {
    // Fetch posts from Sanity
    const sanityPosts = await getSanityPosts();
    
    // Format posts for display
    const formattedPosts = sanityPosts.map(formatPostForDisplay);

    return {
      props: {
        posts: formattedPosts,
      },
      // Revalidate pages every 10 minutes (600 seconds)
      revalidate: 600,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
}; 