import { useState, useEffect } from 'react';
import { SanityResource } from '@/lib/types';
import { ChevronRight, ChevronUp } from 'lucide-react';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
  resources: SanityResource[];
  title?: string;
}

export const ResourceGrid = ({ 
  resources,
  title = "Our Resources"
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
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <p className="text-lg text-gray-600 text-center max-w-3xl">
            Explore our curated collection of resources to help you learn and grow.
          </p>
        </div>

        {resources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleResources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
            
            <div className="flex justify-center mt-12 space-x-4">
              {visibleResources.length < resources.length && (
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                           transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>View More</span>
                  <ChevronRight size={18} />
                </button>
              )}
              
              {expanded && (
                <button
                  onClick={collapse}
                  className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg 
                           transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Collapse</span>
                  <ChevronUp size={18} />
                </button>
              )}
            </div>
            
            {visibleResources.length > 0 && (
              <div className="text-center mt-4 text-gray-500 text-sm">
                Showing {visibleResources.length} of {resources.length} resources
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No resources available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}; 