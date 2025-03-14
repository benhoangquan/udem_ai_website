import { GetStaticProps } from "next";
import { SanityPost } from "@/lib/types";
import { PostBlock } from "@/components/posts/PostBlock";
import { getSanityPosts, formatPostForDisplay } from "@/lib/services/post-service";

interface PostsPageProps {
  posts: SanityPost[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest posts</h1>
      <div className="my-6 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostBlock key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
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