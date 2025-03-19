import { useState, useEffect } from 'react';
import { SanityResource } from '@/lib/types';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: SanityResource[];
  title?: string;
  description?: string;
}

export const ResourceGrid = ({ 
  resources,
  title = "Our Resources",
  description
}: ResourceGridProps) => {
  const [visibleResources, setVisibleResources] = useState<SanityResource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const resourcesPerPage = 6; // 2x3 grid initially
  const totalPages = Math.ceil(resources.length / resourcesPerPage);
  
  useEffect(() => {
    // Update visible resources when page changes or when resources prop changes
    const startIndex = 0;
    const endIndex = currentPage * resourcesPerPage;
    setVisibleResources(resources.slice(startIndex, endIndex));
    
    // Set expanded state if we've loaded more than initial page
    setExpanded(currentPage > 1);
  }, [currentPage, resources, resourcesPerPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const collapse = () => {
    setCurrentPage(1);
    setExpanded(false);
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-blue-50 opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-center text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleResources.map(resource => (
            <div key={resource._id} className="h-full">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          {!expanded && currentPage < totalPages && (
            <button
              onClick={loadMore}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md"
            >
              View More Resources
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          )}
          
          {expanded && (
            <button
              onClick={collapse}
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Show Less
              <ChevronUp className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}; 