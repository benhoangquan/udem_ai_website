import { useState, useEffect } from 'react';
import { SanityResource } from '@/lib/types';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { Card, CardBar, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <CardTitle 
            colorScheme="default"
            size="lg"
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            {title}
          </CardTitle>
          <CardBar colorScheme="primary" size="md" className="mb-8" />
          {description && (
            <CardDescription 
              colorScheme="muted"
              size="md"
              className="text-lg text-center max-w-3xl"
            >
              {description}
            </CardDescription>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleResources.map(resource => (
            <div key={resource._id} className="h-full">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
        
        {visibleResources.length === 0 && (
          <Card variant="outline" className="p-8 text-center">
            <CardContent>
              <CardDescription colorScheme="muted" size="md">
                No resources available at this time. Check back soon!
              </CardDescription>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center mt-10">
          {!expanded && currentPage < totalPages && (
            <Button
              onClick={loadMore}
              variant="default"
              size="lg"
              className="flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700"
            >
              View More Resources
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
          
          {expanded && (
            <Button
              onClick={collapse}
              variant="outline"
              size="lg"
              className="flex items-center justify-center rounded-full"
            >
              Show Less
              <ChevronUp className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}; 