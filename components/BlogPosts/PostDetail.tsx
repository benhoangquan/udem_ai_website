import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import { PostProps, SanityPost, isFullAuthor } from '@/lib/types';
import { getSanityImageUrl } from '@/lib/utils/image-helpers';
import { getBlogPostUrl } from '@/lib/utils/url-helpers';

// Portable Text components for rendering Sanity content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image 
          src={getSanityImageUrl(value, 800, 600)} 
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
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-blue-400 hover:text-blue-500 underline"
        >
          {children}
        </Link>
      );
    },
  },
};

export const PostDetail = ({ post }: PostProps) => {
  if (!post) return <div>Post not found</div>;

  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : '';

  // Check if author is a full author object (not just a reference)
  const fullAuthor = post.author && isFullAuthor(post.author) ? post.author : null;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        
        {/* Post Meta */}
        <div className="flex flex-wrap items-center text-gray-400 mb-6">
          {fullAuthor && (
            <div className="flex items-center mr-6">
              {fullAuthor.image && (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                  <Image
                    src={getSanityImageUrl(fullAuthor.image, 40, 40)}
                    alt={fullAuthor.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <span>{fullAuthor.name}</span>
            </div>
          )}
          
          {formattedDate && (
            <time className="mr-6">
              {formattedDate}
            </time>
          )}
          
          {post.readingTimeMinutes && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
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
            src={getSanityImageUrl(post.mainImage, 1200, 500)}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      
      {/* Post Content */}
      <div className="prose prose-lg prose-invert max-w-none">
        {post.body && (
          <PortableText 
            value={post.body} 
            components={portableTextComponents}
          />
        )}
      </div>
      
      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TypeScript needs help - we know these are SanityPost objects at this point */}
            {(post.relatedPosts as SanityPost[]).map((relatedPost) => (
              <div key={relatedPost._id} className="border border-gray-800 rounded-md p-4">
                {relatedPost.mainImage && (
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={getSanityImageUrl(relatedPost.mainImage, 400, 200)}
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
                <Link 
                  href={getBlogPostUrl(relatedPost)}
                  className="text-blue-400 hover:text-blue-500 mt-2 inline-block"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}; 