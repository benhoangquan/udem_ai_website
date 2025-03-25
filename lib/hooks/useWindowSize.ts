import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useWindowSize(): WindowSize {
  // Initialize with undefined to handle server-side rendering
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update window size state
      setWindowSize({
        width,
        height,
        isMobile: width < 768, // Less than md breakpoint
        isTablet: width >= 768 && width < 1024, // Between md and lg breakpoints
        isDesktop: width >= 1024, // lg and above
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return windowSize;
} 