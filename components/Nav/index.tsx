import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu toggle
import { useRouter } from "next/router";

export const Nav = () => {
  // State for mobile menu and scroll position
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  
  // Handle scroll events to apply different styles based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Apply conditional styles based on scroll position
  // const navClasses = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[100%] 
  const navClasses = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 
    ${scrollPosition > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg opacity-50' : 'bg-white/90'} 
    rounded-2xl transition-all duration-300`;

  return (
    <header className={navClasses}>
      <div className="relative px-3 py-2 md:px-4 md:py-2">
        <div className="flex items-center justify-between">
          {/* Logo/Home link */}
          <Link href="/" className="font-bold text-xl text-blue-800">
            UdemAI
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-blue-800 p-1 rounded-lg hover:bg-blue-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="block px-3 py-1.5 text-blue-800 hover:bg-blue-50 rounded-lg">
              Home
            </Link>

            {/* Blog */}
            <Link 
              href="/blog"
              className="block px-3 py-1.5 text-blue-800 hover:bg-blue-50 rounded-lg"
            >
              Blog
            </Link>

            <Link 
              href={isHomePage ? "/#activities" : "/#activities"} 
              scroll={isHomePage}
              className="block px-3 py-1.5 text-blue-800 hover:bg-blue-50 rounded-lg"
            >
              Activities
            </Link>

            {/* Resources */}
            <Link 
              href={isHomePage ? "/#resources" : "/resources"} 
              scroll={isHomePage}
              className="block px-3 py-1.5 text-blue-800 hover:bg-blue-50 rounded-lg"
            >
              Resources
            </Link>


            <Link 
              href={isHomePage ? "/#opportunities" : "/opportunities"} 
              scroll={isHomePage}
              className="block px-3 py-1.5 text-blue-800 hover:bg-blue-50 rounded-lg"
            >
              Opportunities
            </Link>

            <Link 
              href="https://discord.com/invite/2Ttnw8p2Hy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg"
            >
              Discord
            </Link>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-2 pb-1 border-t border-blue-100 mt-2">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                href="/blog"
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                href={isHomePage ? "/#activities" : "/activities"} 
                scroll={isHomePage}
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Activities
              </Link>
              
              <Link 
                href={isHomePage ? "/#resources" : "/resources"} 
                scroll={isHomePage}
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              
              <Link 
                href="https://discord.com/invite/2Ttnw8p2Hy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block py-1.5 px-3 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Discord
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
