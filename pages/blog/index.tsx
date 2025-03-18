import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { SanityPost } from "@/lib/types";
import { PostBlock } from "@/components/BlogPosts/PostBlock";
import { getSanityPosts, formatPostForDisplay } from "@/lib/services/post-service";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Our Blog
          </h1>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <p className="text-lg text-gray-600 text-center max-w-3xl">
            Stay up to date with the latest news, tutorials, and insights from our community.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post) => (
                <PostBlock key={post._id} post={post} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No blog posts found.</p>
          </div>
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