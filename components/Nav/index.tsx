import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 w-full opacity-85
    ${scrollPosition > 50 ? 
      'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 
      'bg-white/90 dark:bg-gray-900/90'} 
    transition-all duration-300`;

  return (
    <header className={navClasses}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          {/* Logo */}
          {/* <Link href="/" className="relative w-32 h-8">
            <Image
              src="/images/logo_cropped.png"
              alt="UdemAI Logo"
              fill
              priority
              className="object-contain"
            />
          </Link> */}

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
            <Link href="/" className="block px-3 py-1.5 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
              Home
            </Link>

            <Link 
              href="/about"
              className="block px-3 py-1.5 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
            >
              About
            </Link>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 py-1.5 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="w-full">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href={isHomePage ? "/#resources" : "/resources"}
                    scroll={isHomePage}
                    className="w-full"
                  >
                    Learning Resources
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href={isHomePage ? "/#activities" : "/#activities"} 
              scroll={isHomePage}
              className="block px-3 py-1.5 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
            >
              Activities
            </Link>

            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-blue-300" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-800" />
                )
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Join Us CTA Button */}
            <Link href="/join">
              <Button 
                variant="blue"
                className="ml-2"
              >
                Join Us
              </Button>
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
                href="/about"
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link 
                href="/blog"
                className="block py-1.5 px-3 text-blue-800 hover:bg-blue-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
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
                href={isHomePage ? "/#activities" : "/activities"} 
                scroll={isHomePage}
                className="block py-1.5 px-3 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Activities
              </Link>

              {/* Theme toggle button */}
              <button
                className="flex w-full items-center py-1.5 px-3 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsMenuOpen(false);
                }}
              >
                {mounted && (
                  <>
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-5 w-5 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </>
                )}
              </button>

              <Link href="/join" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="blue"
                  className="w-full mt-2"
                >
                  Join Us
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
