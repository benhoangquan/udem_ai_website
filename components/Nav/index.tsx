import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { FaDiscord } from "react-icons/fa6";

export const Nav = () => {
  return (
    <header className="container mx-auto py-4 px-4">
      <div className="navbar w-full md:w-3/5 mx-auto border-b-2">
        <div className="flex items-center justify-center pb-4 text-base md:text-xl space-x-4">
          <Link href="/" className="px-4">
            Home
          </Link>
          <Link href="#" className="px-4">
            Activities
          </Link>

          {/* Resources Popover */}
          <Popover className="relative">
            <PopoverButton className="px-4 focus:outline-none">
              Resources
            </PopoverButton>
            <PopoverPanel className="absolute left-0 mt-2 w-48 bg-amber-950 border rounded shadow-lg">
              <Link href="/resources/library" className="block px-4 py-2 hover:bg-amber-700">
                Library
              </Link>
              <Link href="/resources/projects" className="block px-4 py-2 hover:bg-amber-700">
                Projects
              </Link>
              <Link href="/resources/tools" className="block px-4 py-2 hover:bg-amber-700">
                AI Tools
              </Link>
            </PopoverPanel>
          </Popover>

          <Popover className="relative">
            <PopoverButton className="px-4 focus:outline-none">
              Opportunities
            </PopoverButton>
            <PopoverPanel className="absolute left-0 mt-2 w-48 bg-amber-950 border rounded shadow-lg">
              <Link href="/resources/library" className="block px-4 py-2 hover:bg-amber-700">
                Volunteer
              </Link>
              <Link href="/resources/projects" className="block px-4 py-2 hover:bg-amber-700">
                Leadership
              </Link>
              <Link href="/resources/tools" className="block px-4 py-2 hover:bg-amber-700">
                Collaboration
              </Link>
            </PopoverPanel>
          </Popover>

          <Link href="#" className="px-4">
            Leaderboard
          </Link>
          <Link href="https://discord.com/invite/YOUR_DISCORD_INVITE" target="_blank" rel="noopener noreferrer" className="px-4 text-gray-200 hover:text-blue-500">
            <FaDiscord size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};
