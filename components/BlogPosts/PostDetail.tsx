import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import { PostProps, SanityPost, isFullAuthor } from '@/lib/types';
import { getSanityImageUrl } from '@/lib/utils/image-helpers';
import { getBlogPostUrl } from '@/lib/utils/url-helpers';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  // Format the publication date
  const formatPostDate = (date?: string) => {
    if (!date) return 'Unknown date';
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  // Get author display data
  const getAuthorData = () => {
    if (!post.author) return { name: 'Unknown author', image: null };
    
    if (isFullAuthor(post.author)) {
      return {
        name: post.author.name,
        image: post.author.image
      };
    }
    
    return { name: 'Unknown author', image: null };
  };

  const { name: authorName, image: authorImage } = getAuthorData();

  // Define the reading time
  const readingTime = post.readingTimeMinutes || Math.ceil(post.body?.length / 1500) || 5;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-4 pb-0">
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-2">
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2">
                {post.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            <span>
              {formatPostDate(post.publishedAt)}
            </span>
            <span>
              {readingTime} min read
            </span>
          </div>
          
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </CardTitle>
          
          {post.excerpt && (
            <CardDescription className="text-xl text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </CardDescription>
          )}
          
          <div className="flex items-center space-x-3 mb-8">
            {authorImage ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src={getSanityImageUrl(authorImage, 40, 40)} 
                  alt={authorName} 
                  width={40} 
                  height={40} 
                  className="object-cover" 
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-semibold text-sm">
                  {authorName.charAt(0)}
                </span>
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-900">{authorName}</p>
              <p className="text-gray-500">Author</p>
            </div>
          </div>
        </CardHeader>
      
        {post.mainImage && (
          <div className="mb-10 rounded-xl overflow-hidden h-[30rem] relative">
            <Image 
              src={getSanityImageUrl(post.mainImage, 1200, 600)} 
              alt={post.title} 
              fill
              className="object-cover" 
            />
          </div>
        )}

        <CardContent className="pt-6">
          <div className="prose prose-lg max-w-none">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-6 border-t pt-8 mt-8">
          {/* Tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full">
              <span className="text-gray-600 font-medium">Tags:</span>
              {post.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          {/* Related posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.relatedPosts
                  .filter((relatedPost): relatedPost is SanityPost => 
                    'title' in relatedPost && '_id' in relatedPost
                  )
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Card key={relatedPost._id} className="h-full">
                      <Link href={getBlogPostUrl(relatedPost)} className="block h-full hover:opacity-90 transition-opacity">
                        <div className="relative h-40">
                          {relatedPost.mainImage && (
                            <Image 
                              src={getSanityImageUrl(relatedPost.mainImage, 300, 200)} 
                              alt={relatedPost.title} 
                              fill
                              className="object-cover" 
                            />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                          {relatedPost.publishedAt && (
                            <p className="text-sm text-gray-500 mt-1">
                              {format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}
                            </p>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
              </div>
            </div>
          )}
          
          <div className="w-full flex justify-between pt-4">
            <Button variant="outline" asChild>
              <Link href="/blog">← Back to Blog</Link>
            </Button>
            <Button variant="blue" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}; 