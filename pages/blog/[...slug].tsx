import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { getSanityPosts, getSanityPostBySlug } from '@/lib/service';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

interface PostProps {
  post: any;
}

export default function PostPage({ post }: PostProps) {
  if (!post) return <div>Loading...</div>;

  // Helper function to safely generate image URLs
  const getImageUrl = (image: any, width = 800, height = 600) => {
    try {
      return urlFor(image).width(width).height(height).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "";
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          
          {/* Post Meta */}
          <div className="flex items-center text-gray-400 mb-6">
            {post.author && (
              <div className="flex items-center mr-6">
                {post.author.image && (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                    <Image
                      src={getImageUrl(post.author.image, 40, 40)}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            
            {post.publishedAt && (
              <time>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
            )}
          </div>
          
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category: string) => (
                <span 
                  key={category} 
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-8">
            <Image
              src={getImageUrl(post.mainImage, 1200, 500)}
              alt={post.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        
        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          {post.body && (
            <PortableText 
              value={post.body} 
              components={{
                // You can customize your portable text components here
                types: {
                  image: ({value}) => {
                    return (
                      <div className="my-8">
                        <Image 
                          src={getImageUrl(value, 800, 600)} 
                          alt={value.alt || ''} 
                          width={800} 
                          height={600} 
                          className="rounded-md" 
                        />
                        {value.caption && (
                          <div className="text-center text-sm text-gray-400 mt-2">
                            {value.caption}
                          </div>
                        )}
                      </div>
                    )
                  }
                }
              }}
            />
          )}
        </div>
        
        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost: any) => (
                <div key={relatedPost._id} className="border border-gray-800 rounded-md p-4">
                  {relatedPost.mainImage && (
                    <div className="relative w-full h-40 mb-4">
                      <Image
                        src={getImageUrl(relatedPost.mainImage, 400, 200)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                  {relatedPost.excerpt && (
                    <p className="text-gray-400 text-sm">{relatedPost.excerpt}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

// This function gets called at build time to generate paths
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getSanityPosts();
  
  const paths = posts.map((post: any) => {
    // Create a URL-friendly version of the title
    const titleForUrl = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') // Remove special characters
      .replace(/\s+/g, '-');     // Replace spaces with hyphens
    
    return {
      // Using a catch-all route: /blog/[slug]/[title]
      params: { 
        slug: [post.slug.current, titleForUrl]
      }
    };
  });
  
  return {
    paths,
    fallback: 'blocking'
  };
};

// This function gets called at build time to fetch data for each post
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Extract the actual slug from the first segment of the catch-all route
  const slugArray = params?.slug as string[];
  const slug = slugArray[0];
  
  const post = await getSanityPostBySlug(slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      post
    },
    revalidate: 600 // Revalidate every 10 minutes
  };
}; 