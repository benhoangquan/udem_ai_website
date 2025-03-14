import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu toggle

export const Nav = () => {
  // State for mobile menu and scroll position
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
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
  const navClasses = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 
    ${scrollPosition > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90'} 
    rounded-2xl transition-all duration-300`;

  return (
    <header className={navClasses}>
      <div className="relative px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Home link */}
          <Link href="/" className="font-bold text-xl text-blue-800">
            UdemAI
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-blue-800 p-2 rounded-lg hover:bg-blue-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-blue-800 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/activities" className="text-blue-800 hover:text-blue-600 transition-colors">
              Activities
            </Link>

            {/* Resources Popover */}
            <Popover className="relative">
              <PopoverButton className="focus:outline-none text-blue-800 hover:text-blue-600 transition-colors">
                Resources
              </PopoverButton>
              <PopoverPanel className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl shadow-lg z-10">
                <div className="py-1">
                  <Link href="/resources/library" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    Library
                  </Link>
                  <Link href="/resources/projects" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    Projects
                  </Link>
                  <Link href="/resources/aitools" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    AI Tools
                  </Link>
                </div>
              </PopoverPanel>
            </Popover>

            <Popover className="relative">
              <PopoverButton className="focus:outline-none text-blue-800 hover:text-blue-600 transition-colors">
                Opportunities
              </PopoverButton>
              <PopoverPanel className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl shadow-lg z-10">
                <div className="py-1">
                  <Link href="/opportunities/volunteer" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    Volunteer
                  </Link>
                  <Link href="/opportunities/leadership" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    Leadership
                  </Link>
                  <Link href="/opportunities/collaboration" className="block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg mx-1">
                    Collaboration
                  </Link>
                </div>
              </PopoverPanel>
            </Popover>

            <Link href="/leaderboard" className="text-blue-800 hover:text-blue-600 transition-colors"> 
              Leaderboard
            </Link>
            <Link href="https://discord.com/invite/YOUR_DISCORD_INVITE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
              Discord
            </Link>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-blue-100 mt-3">
            <div className="space-y-2">
              <Link href="/" className="block py-2 px-3 text-blue-800 hover:bg-blue-50 rounded-lg">
                Home
              </Link>
              <Link href="/activities" className="block py-2 px-3 text-blue-800 hover:bg-blue-50 rounded-lg">
                Activities
              </Link>
              
              <div className="py-2 px-3">
                <div className="font-medium text-blue-800 mb-1">Resources</div>
                <div className="pl-2 space-y-1">
                  <Link href="/resources/library" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    Library
                  </Link>
                  <Link href="/resources/projects" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    Projects
                  </Link>
                  <Link href="/resources/aitools" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    AI Tools
                  </Link>
                </div>
              </div>
              
              <div className="py-2 px-3">
                <div className="font-medium text-blue-800 mb-1">Opportunities</div>
                <div className="pl-2 space-y-1">
                  <Link href="/opportunities/volunteer" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    Volunteer
                  </Link>
                  <Link href="/opportunities/leadership" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    Leadership
                  </Link>
                  <Link href="/opportunities/collaboration" className="block py-1 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                    Collaboration
                  </Link>
                </div>
              </div>
              
              <Link href="/leaderboard" className="block py-2 px-3 text-blue-800 hover:bg-blue-50 rounded-lg">
                Leaderboard
              </Link>
              <Link href="https://discord.com/invite/YOUR_DISCORD_INVITE" target="_blank" rel="noopener noreferrer" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold">
                Discord
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
