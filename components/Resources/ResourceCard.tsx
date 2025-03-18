import Link from 'next/link';
import { SanityResource } from '@/lib/types';
import { Book, Video, Code, FileText, Link as LinkIcon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

interface ResourceCardProps {
  resource: SanityResource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getIconForResource = () => {
    // Get icon based on resource category or first content type
    if (resource.content && resource.content.length > 0) {
      switch (resource.content[0].type) {
        case 'document':
          return <FileText size={32} className="text-blue-600" />;
        case 'video':
          return <Video size={32} className="text-red-600" />;
        case 'code':
          return <Code size={32} className="text-purple-600" />;
        case 'link':
          return <LinkIcon size={32} className="text-green-600" />;
        case 'file':
          return <FileText size={32} className="text-blue-600" />;
        default:
          return <Book size={32} className="text-blue-600" />;
      }
    }
    return <Book size={32} className="text-blue-600" />;
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
    <Link href={`/resources/${resource.slug.current}`} className="block h-full">
      <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
        <CardHeader className="flex flex-row items-start gap-4 p-6 pb-4">
          <div className="flex-shrink-0 bg-gray-50 p-3 rounded-md">
            {getIconForResource()}
          </div>
          <div className="flex-grow space-y-2">
            <CardTitle className="text-xl line-clamp-2">
              {resource.title}
            </CardTitle>
            {resource.category && (
              <CardDescription className="text-sm text-gray-600">
                {resource.category.name}
              </CardDescription>
            )}
            {resource.difficulty && (
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor()}`}>
                {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
              </span>
            )}
          </div>
        </CardHeader>
        
        {resource.tags && resource.tags.length > 0 && (
          <CardFooter className="px-6 pb-4 pt-0 mt-auto">
            <div className="flex flex-wrap gap-2">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="inline-block bg-gray-100 px-2 py-1 text-xs text-gray-700 rounded">
                  {tag}
                </span>
              ))}
              {resource.tags.length > 3 && (
                <span className="inline-block bg-gray-100 px-2 py-1 text-xs text-gray-700 rounded">
                  +{resource.tags.length - 3}
                </span>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default ResourceCard; 