import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { IconType } from "react-icons";
import { createElement } from 'react';
import { IconBaseProps } from "react-icons";

const SocialLink = ({ href, icon, label }: { href: string; icon: IconType; label: string }) => (
  <Link 
    href={href} 
    target={href.startsWith('mailto:') ? undefined : '_blank'}
    className="text-primary hover:text-secondary transition-colors"
    aria-label={label}
  >
    {createElement(icon, { size: 24 })}
  </Link>
);

export const Footer = () => {
  return (
    <footer className="container mx-auto bg-primary/5 mt-8 w-full">
      <div className="text-center border-t border-primary/10 py-8">
        <div className="flex items-center justify-center gap-6 mb-4">
          <SocialLink 
            href="https://instagram.com/udem.ai" 
            icon={FaInstagram}
            label="Instagram"
          />
          <SocialLink 
            href="https://linkedin.com/company/udem-ai" 
            icon={FaLinkedin}
            label="LinkedIn"
          />
          <SocialLink 
            href="mailto:contact@udem.ai"
            icon={MdEmail}
            label="Email"
          />
          <SocialLink 
            href="https://github.com/udem-ai" 
            icon={FaGithub}
            label="GitHub"
          />
        </div>
        <p className="text-sm text-primary/80">© {new Date().getFullYear()} UdeM AI. All rights reserved.</p>
      </div>
    </footer>
  );
};
