import Link from "next/link";
import Image from "next/image";
import { SanityGeneralInfo, SanityImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { urlForImage } from "@/lib/sanity.image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardTitle, CardDescription } from "../ui/card";

interface HeroProps {
  generalInfo: SanityGeneralInfo;
}

export const Hero = ({ generalInfo}: HeroProps) => {
  // State for gallery auto-scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const galleryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Fallback gallery items with colors
  const fallbackGalleryItems = useMemo(() => [
    { color: "bg-blue-600", text: "AI Workshop", textColor: "text-white" },
    { color: "bg-blue-500", text: "Coding Session", textColor: "text-white" },
    { color: "bg-blue-400", text: "Team Discussion", textColor: "text-white" },
    { color: "bg-blue-300", text: "Presentation", textColor: "text-blue-900" },
  ], []);

  // Get item count
  const itemCount = useMemo(() => 
    generalInfo?.gallery?.length || fallbackGalleryItems.length, 
    [generalInfo?.gallery, fallbackGalleryItems]
  );

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

  // Toggle pause state
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
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
        case ' ':
          togglePause();
          e.preventDefault();
          break;
        default:
          break;
      }
    }
  }, [goToPrevious, goToNext, togglePause]);

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Set up gallery auto-scroll
  useEffect(() => {
    // Don't auto-scroll if paused or user is hovering
    if (isPaused || isHovering || itemCount <= 1) {
      if (galleryTimerRef.current) {
        clearInterval(galleryTimerRef.current);
        galleryTimerRef.current = null;
      }
      return;
    }
    
    // Start auto-scrolling
    galleryTimerRef.current = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % itemCount);
    }, 5000); // Scroll every 5 seconds

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (galleryTimerRef.current) {
        clearInterval(galleryTimerRef.current);
      }
    };
  }, [isHovering, isPaused, itemCount]);

  // Get Discord link if available
  const discordLink = useMemo(() => 
    generalInfo?.socialMedia?.discord || "#", 
    [generalInfo?.socialMedia?.discord]
  );

  // Prepare gallery items for rendering
  const galleryItems = useMemo(() => 
    generalInfo?.gallery?.length ? generalInfo.gallery : fallbackGalleryItems,
    [generalInfo?.gallery, fallbackGalleryItems]
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Gallery Background and Overlaid Text */}
      <section className="relative h-screen overflow-hidden pt-16" aria-label="Hero section">
        {/* Gallery Background */}
        <div 
          ref={galleryRef}
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          role="region"
          aria-label="Image gallery"
          tabIndex={0}
        >
          {/* Render gallery images */}
          <div className="relative h-full w-full">
            {galleryItems.map((item, index) => {
              // Handle both Sanity images and fallback colored boxes
              if ('color' in item) {
                // Fallback colored box
                return (
                  <div 
                    key={`fallback-${index}`}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    } ${item.color}`}
                    aria-hidden={index !== activeIndex}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${item.textColor}`}>
                        {item.text}
                      </span>
                    </div>
                  </div>
                );
              } else {
                // Sanity image
                return (
                  <div 
                    key={`image-${index}`}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={index !== activeIndex}
                  >
                    {item && (
                      <Image 
                        src={urlForImage(item as SanityImage).url()} 
                        alt={`Gallery image ${index + 1}`}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className="object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </div>
                );
              }
            })}
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Text Content Overlay */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <CardTitle className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {generalInfo?.title || "UdemAI"}
              </CardTitle>
              <CardDescription className="text-xl md:text-2xl mb-6 text-blue-100">
                We are a community of AI enthusiasts at the University of Montreal
              </CardDescription>
              {/* <p className="mb-8 text-white/90">
                Join our community of AI builders, researchers, and innovators. We explore cutting-edge AI technologies 
                through hands-on projects, workshops, and collaborative learning.
              </p> */}
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
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button 
            onClick={togglePause}
            className={`p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
              isPaused ? 'bg-blue-500/50 text-white' : 'bg-white/20 text-white'
            }`}
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            aria-pressed={isPaused}
          >
            <span className="sr-only">{isPaused ? "Resume" : "Pause"}</span>
            <span aria-hidden="true">{isPaused ? "▶" : "⏸"}</span>
          </button>
          <button 
            onClick={goToNext}
            className="p-2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Next image"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        
        {/* Indicators */}
        <div 
          className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2"
          role="tablist"
          aria-label="Gallery navigation"
        >
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-white/50'
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
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
