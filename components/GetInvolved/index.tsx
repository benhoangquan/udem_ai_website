import Link from 'next/link';
import { MessageSquare, Users, Handshake } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GetInvolvedProps {
  title?: string;
  description?: string;
}

export const GetInvolved = ({ 
  title = "Get Involved", 
  description = "Join our community of AI enthusiasts and make a difference. Whether you're looking to connect, lead, or collaborate, there's a place for you."
}: GetInvolvedProps) => {
  return (
    <section id="opportunities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            {title}
          </CardTitle>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <CardDescription className="text-lg text-center max-w-3xl">
            {description}
          </CardDescription>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Join Discord */}
          <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-6 bg-blue-50 flex items-center justify-center">
              <MessageSquare size={64} className="text-blue-600" />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl font-semibold mb-3">
                Join Discord
              </CardTitle>
              <CardDescription className="text-gray-600">
                Connect with a vibrant community of AI enthusiasts, participate in discussions, get help with projects, and stay updated on events and opportunities.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                variant="blue" 
                className="w-full" 
                asChild
              >
                <a 
                  href="https://discord.com/invite/YOUR_DISCORD_INVITE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Card 2: Become a Member */}
          <Card className="overflow-hidden flex flex-col h-full relative bg-gradient-to-br from-blue-50 to-white">
            {/* Featured badge */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-3 text-sm font-medium z-10">
              Featured
            </div>
            
            <CardHeader className="p-6 flex items-center justify-center relative z-0">
              <Users size={64} className="text-blue-600" />
            </CardHeader>
            <CardContent className="p-6 flex-grow relative z-0">
              <CardTitle className="text-2xl font-semibold mb-3">
                Become a Member
              </CardTitle>
              <CardDescription className="text-gray-600">
                Join our official membership program to gain access to exclusive workshops, mentorship opportunities, networking events, and contribute to club initiatives.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                variant="blue" 
                className="w-full" 
                asChild
              >
                <Link href="/join">
                  Apply Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Card 3: Partner With Us */}
          <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-6 bg-blue-50 flex items-center justify-center">
              <Handshake size={64} className="text-blue-600" />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl font-semibold mb-3">
                Partner With Us
              </CardTitle>
              <CardDescription className="text-gray-600">
                Collaborate with our organization for events, hackathons, research initiatives, or sponsorship opportunities. We're open to partnerships that advance AI education and innovation.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                variant="blue" 
                className="w-full" 
                asChild
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}; 