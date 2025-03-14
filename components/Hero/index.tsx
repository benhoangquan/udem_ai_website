import Link from "next/link";
import Image from "next/image";
import { SanityGeneralInfo, SanityImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { urlForImage } from "@/lib/sanity.image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  generalInfo: SanityGeneralInfo;
}

export const Hero = ({ generalInfo}: HeroProps) => {
  // State for gallery auto-scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const galleryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Fallback gallery items with colors
  const fallbackGalleryItems = [
    { color: "bg-blue-600", text: "AI Workshop", textColor: "text-white" },
    { color: "bg-blue-500", text: "Coding Session", textColor: "text-white" },
    { color: "bg-blue-400", text: "Team Discussion", textColor: "text-white" },
    { color: "bg-blue-300", text: "Presentation", textColor: "text-blue-900" },
  ];

  // Get item count
  const itemCount = generalInfo?.gallery?.length || fallbackGalleryItems.length;

  // Navigation functions for gallery
  const goToPrevious = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % itemCount);
  }, [itemCount]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (document.activeElement === galleryRef.current || galleryRef.current?.contains(document.activeElement)) {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          e.preventDefault();
          break;
        case 'ArrowRight':
          goToNext();
          e.preventDefault();
          break;
        default:
          break;
      }
    }
  }, [goToPrevious, goToNext]);

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Set up gallery auto-scroll
  useEffect(() => {
    // Start auto-scrolling
    const startAutoScroll = () => {
      if (itemCount > 1 && !isHovering) {
        galleryTimerRef.current = setInterval(() => {
          setActiveIndex(prevIndex => (prevIndex + 1) % itemCount);
        }, 5000); // Scroll every 5 seconds
      }
    };

    // Clear any existing timer
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
      galleryTimerRef.current = null;
    }

    startAutoScroll();

    // Cleanup interval on unmount
    return () => {
      if (galleryTimerRef.current) {
        clearInterval(galleryTimerRef.current);
      }
    };
  }, [generalInfo?.gallery, isHovering, itemCount]);

  // Get Discord link if available
  const discordLink = generalInfo?.socialMedia?.discord || "#";

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Gallery Background and Overlaid Text */}
      <section className="relative h-screen overflow-hidden -mt-20">
        {/* Gallery Background */}
        <div 
          ref={galleryRef}
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-hidden="true"
        >
          {/* If we have Sanity gallery images */}
          {generalInfo?.gallery && generalInfo.gallery.length > 0 ? (
            <div className="relative h-full w-full">
              {/* Images */}
              {generalInfo.gallery.map((image: SanityImage, index: number) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  {image && (
                    <Image 
                      src={urlForImage(image).url()} 
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Fallback colored boxes with auto-scroll effect
            <div className="relative h-full w-full">
              {fallbackGalleryItems.map((item, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  } ${item.color}`}
                  aria-hidden={index !== activeIndex}
                />
              ))}
            </div>
          )}
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Text Content Overlay */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {generalInfo?.title || "UdemAI"}
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-blue-100">
                Where Students Innovate with AI at University of Montreal
              </h2>
              <p className="mb-8 text-white/90">
                Join our community of AI enthusiasts, researchers, and innovators. We explore cutting-edge AI technologies 
                through hands-on projects, workshops, and collaborative learning.
              </p>
              <Button variant="default" size="lg" asChild className="rounded-full">
                <Link href={discordLink}>Join Our Discord</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Gallery Navigation Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
          <button 
            onClick={goToPrevious}
            className="p-2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNext}
            className="p-2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {(generalInfo?.gallery?.length ? generalInfo.gallery : fallbackGalleryItems).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-white/50'
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        
        {/* Screen reader announcement of current slide */}
        <div className="sr-only" aria-live="polite">
          Showing slide {activeIndex + 1} of {itemCount}
        </div>
      </section>
    </div>
  );
};
