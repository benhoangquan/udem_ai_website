import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SanityActivity } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity.image';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActivityCarouselProps {
  activities: SanityActivity[];
  title?: string;
}

export const ActivityCarousel = ({ activities, title = "What Do We Do?" }: ActivityCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Format time function
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'h:mm a');
  };

  // Location display function
  const getLocationDisplay = (activity: SanityActivity) => {
    if (!activity.location) return 'Location TBA';
    
    if (activity.location.type === 'online') {
      return 'Online';
    } else if (activity.location.venue) {
      return activity.location.venue;
    } else if (activity.location.address) {
      return activity.location.address;
    }
    
    return 'Location TBA';
  };

  // Navigation functions
  const goToPrev = () => {
    if (carouselRef.current && activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      const itemWidth = carouselRef.current.scrollWidth / activities.length;
      carouselRef.current.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (carouselRef.current && activeIndex < activities.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      const itemWidth = carouselRef.current.scrollWidth / activities.length;
      carouselRef.current.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' });
    }
  };

  // Drag handlers for mobile/touch
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / activities.length;
      const closestIndex = Math.round(carouselRef.current.scrollLeft / itemWidth);
      setActiveIndex(Math.max(0, Math.min(closestIndex, activities.length - 1)));
      carouselRef.current.scrollTo({ left: itemWidth * closestIndex, behavior: 'smooth' });
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Scroll to update active index on scroll
  const handleScroll = () => {
    if (!carouselRef.current || isDragging) return;
    const itemWidth = carouselRef.current.scrollWidth / activities.length;
    const scrollPosition = carouselRef.current.scrollLeft;
    const closestIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(Math.max(0, Math.min(closestIndex, activities.length - 1)));
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Fallback content if no activities
  if (!activities || activities.length === 0) {
    return (
      <section className="h-screen bg-white flex flex-col items-center justify-center">
        <CardTitle className="text-3xl md:text-4xl font-bold mb-8 text-blue-900">
          {title}
        </CardTitle>
        <CardDescription className="text-xl text-blue-700">
          We're working on adding new activities. Check back soon!
        </CardDescription>
      </section>
    );
  }

  return (
    <section className="h-screen relative bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 pt-16 h-full flex flex-col">
        {/* Title area */}
        <div className="mb-8">
          <CardTitle className="text-3xl md:text-5xl font-bold text-blue-900">
            {title}
          </CardTitle>
        </div>
        
        {/* Activities carousel */}
        <div className="relative flex-grow">
          <div 
            ref={carouselRef}
            className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {activities.map((activity, index) => (
              <div 
                key={activity._id} 
                className={`h-full min-w-full md:min-w-[40%] lg:min-w-[40%] xl:min-w-[40%] pr-4 snap-start flex-shrink-0`}
              >
                <Card className="h-full max-h-[70vh] rounded-3xl overflow-hidden relative group border-0 shadow-none">
                  {/* Activity Image */}
                  {activity.mainImage ? (
                    <div className="absolute inset-0">
                      <Image 
                        src={urlForImage(activity.mainImage).url()}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-blue-${400 + (index % 3) * 100} flex items-center justify-center`}>
                      {/* <span className="text-4xl font-bold text-white">{activity.type.replace('_', ' ')}</span> */}
                    </div>
                  )}
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
                  
                  {/* Activity content overlay */}
                  <CardContent className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="max-w-xl">
                      {/* Activity Type Badge */}
                      <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-blue-600 text-white rounded-full">
                        {activity.type.replace('_', ' ').toUpperCase()}
                      </span>
                      
                      {/* Title */}
                      <CardTitle className="text-3xl md:text-4xl font-bold mb-3 text-white">
                        {activity.title}
                      </CardTitle>
                      
                      {/* Description */}
                      {activity.description && (
                        <CardDescription className="mb-6 text-white/90 line-clamp-3">
                          <PortableText value={activity.description} />
                        </CardDescription>
                      )}
                      
                      {/* Activity details */}
                      <div className="mb-6 space-y-2">
                        {activity.schedule?.startDateTime && (
                          <div className="flex items-center text-white/90">
                            <Calendar size={18} className="mr-2" />
                            <span>{formatDate(activity.schedule.startDateTime)}</span>
                            {activity.schedule.startDateTime && (
                              <span className="ml-2">
                                <Clock size={18} className="inline mr-1" />
                                {formatTime(activity.schedule.startDateTime)}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center text-white/90">
                          <MapPin size={18} className="mr-2" />
                          <span>{getLocationDisplay(activity)}</span>
                        </div>
                      </div>
                      
                      {/* View details button */}
                      {activity.slug && (
                        <Button 
                          variant="blue" 
                          size="lg" 
                          className="rounded-full"
                          asChild
                        >
                          <Link href={`/activities/${activity.slug.current}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
            <Button 
              onClick={goToPrev}
              disabled={activeIndex === 0}
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full p-3 bg-gray-200 text-gray-800 hover:bg-gray-300",
                activeIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Previous activity"
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button 
              onClick={goToNext}
              disabled={activeIndex === activities.length - 1}
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full p-3 bg-gray-200 text-gray-800 hover:bg-gray-300",
                activeIndex === activities.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Next activity"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {activities.map((_, index) => (
              <Button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  if (carouselRef.current) {
                    const itemWidth = carouselRef.current.scrollWidth / activities.length;
                    carouselRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
                  }
                }}
                variant={index === activeIndex ? "blue" : "ghost"}
                size="icon"
                className={cn(
                  "w-3 h-3 p-0 min-w-0 rounded-full",
                  index === activeIndex ? "bg-blue-600" : "bg-blue-300"
                )}
                aria-label={`Go to activity ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 