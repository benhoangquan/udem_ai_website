import Link from 'next/link';
import { SanityResource } from '@/lib/types';
import { Book, Video, Code, FileText, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

interface ResourceCardProps {
  resource: SanityResource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
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
    
    // Default icon for resources without content
    return <Book size={32} className="text-blue-600" />;
  };
  
  const getDifficultyColor = () => {
    switch (resource.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="h-full rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <CardHeader className={`relative p-4 ${resource.featured ? 'bg-blue-50' : ''}`}>
        {resource.featured && (
          <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
            Featured
          </span>
        )}
        
        <div className="flex items-start justify-between">
          <div className="mb-2">
            {getIconForResource()}
          </div>
          
          {resource.difficulty && (
            <span className={`text-xs font-medium rounded-full px-2 py-1 ${getDifficultyColor()}`}>
              {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
            </span>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
          {resource.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 pt-2">
        {resource.description && (
          <CardDescription className="text-sm text-gray-700 line-clamp-3">
            {/* Using just the excerpt rather than full portable text for simplicity */}
            {typeof resource.description === 'string' 
              ? resource.description 
              : 'Click to view this resource'}
          </CardDescription>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/resources/${resource.slug.current}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
        >
          View Resource
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

// For backward compatibility
export default ResourceCard; 