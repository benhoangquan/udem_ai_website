import { useState, useRef, useEffect } from 'react';
import { SanityMember } from '@/lib/types';
import { MemberCard } from './MemberCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardTitle, CardDescription } from '@/components/ui/card';

interface TeamCarouselProps {
  members: SanityMember[];
  title?: string;
  description?: string;
}

export const TeamCarousel = ({ members, title = "Meet the Team", description }: TeamCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const goToPrev = () => {
    if (carouselRef.current && activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      const itemWidth = carouselRef.current.scrollWidth / members.length;
      carouselRef.current.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (carouselRef.current && activeIndex < members.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      const itemWidth = carouselRef.current.scrollWidth / members.length;
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
      const itemWidth = carouselRef.current.scrollWidth / members.length;
      const closestIndex = Math.round(carouselRef.current.scrollLeft / itemWidth);
      setActiveIndex(Math.max(0, Math.min(closestIndex, members.length - 1)));
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
    const itemWidth = carouselRef.current.scrollWidth / members.length;
    const scrollPosition = carouselRef.current.scrollLeft;
    const closestIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(Math.max(0, Math.min(closestIndex, members.length - 1)));
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

  // Fallback content if no members
  if (!members || members.length === 0) {
    return (
      <section className="py-16 bg-white flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900">
          {title}
        </h2>
        <p className="text-xl text-blue-700">
          {description || "Our team information is coming soon. Check back later!"}
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 pt-4">
        {/* Title area */}
        <div className="flex flex-col items-center mb-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            {title}
          </CardTitle>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          {description && (
            <CardDescription className="text-lg text-center max-w-3xl">
              {description}
            </CardDescription>
          )}
        </div>
        
        {/* Members carousel */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {members.map((member) => (
              <div 
                key={member._id} 
                className="min-w-[280px] md:min-w-[320px] px-3 snap-start flex-shrink-0"
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <Button 
            variant="default" 
            size="icon" 
            className={cn(
              "absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 shadow-md z-10",
              { "opacity-50 cursor-not-allowed": activeIndex === 0 }
            )}
            onClick={goToPrev}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            className={cn(
              "absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 shadow-md z-10",
              { "opacity-50 cursor-not-allowed": activeIndex === members.length - 1 }
            )}
            onClick={goToNext}
            disabled={activeIndex === members.length - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {members.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? 'w-6 bg-blue-600' : 'w-2 bg-blue-200'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const itemWidth = carouselRef.current.scrollWidth / members.length;
                  carouselRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
                  setActiveIndex(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 