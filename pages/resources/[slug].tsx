import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getAllResources, getResourceBySlug } from '@/lib/sanity/queries';
import { SanityResource } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import { Book, Video, Code, FileText, Link as LinkIcon, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface ResourceDetailProps {
  resource: SanityResource;
}

export default function ResourceDetail({ resource }: ResourceDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
        <Link href="/resources" className="text-blue-600 hover:underline">
          Back to Resources
        </Link>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Get icon based on content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={20} className="text-blue-600" />;
      case 'video':
        return <Video size={20} className="text-red-600" />;
      case 'code':
        return <Code size={20} className="text-purple-600" />;
      case 'link':
        return <LinkIcon size={20} className="text-green-600" />;
      case 'file':
        return <FileText size={20} className="text-blue-600" />;
      default:
        return <Book size={20} className="text-blue-600" />;
    }
  };

  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (resource.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Link 
          href="/resources" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Resources
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
                {resource.title}
              </h1>
              
              {resource.difficulty && (
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${getDifficultyColor()}`}>
                  {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                </span>
              )}
            </div>
            
            {resource.category && (
              <div className="mb-6">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm">
                  {resource.category.name}
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-6">
              {resource.publishedAt && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>Published: {formatDate(resource.publishedAt)}</span>
                </div>
              )}
              
              {resource.updatedAt && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>Updated: {formatDate(resource.updatedAt)}</span>
                </div>
              )}
            </div>
            
            {resource.description && (
              <div className="prose max-w-none mb-10">
                <PortableText value={resource.description} />
              </div>
            )}
            
            {resource.content && resource.content.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Resource Contents</h2>
                <div className="space-y-4">
                  {resource.content.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {getContentTypeIcon(item.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 mt-1">{item.description}</p>
                          )}
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Resource
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {resource.tags && resource.tags.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {resource.relatedResources && resource.relatedResources.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Related Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resource.relatedResources.map((related) => {
                    if ('title' in related && 'slug' in related) {
                      return (
                        <Link 
                          key={related._id} 
                          href={`/resources/${related.slug.current}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="font-medium text-blue-600">{related.title}</h3>
                          {related.category && (
                            <p className="text-sm text-gray-600 mt-1">{related.category.name}</p>
                          )}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const resources = await getAllResources();
  
  const paths = resources.map((resource) => ({
    params: { slug: resource.slug.current },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const resource = await getResourceBySlug(slug);
  
  if (!resource) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      resource,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 