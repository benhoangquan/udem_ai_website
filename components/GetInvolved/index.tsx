import Link from 'next/link';
import { MessageSquare, Users, Handshake } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const GetInvolved = () => {
  return (
    <section id="opportunities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Get Involved
          </CardTitle>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <CardDescription className="text-lg text-center max-w-3xl">
            Join our community of AI enthusiasts and make a difference. Whether you're looking to connect, lead, or collaborate, there's a place for you.
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
          
          {/* Card 2: Become a Member/Leader */}
          <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-6 bg-purple-50 flex items-center justify-center">
              <Users size={64} className="text-purple-600" />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl font-semibold mb-3">
                Become a Member/Leader
              </CardTitle>
              <CardDescription className="text-gray-600">
                Take your involvement to the next level. Members get access to exclusive resources, while leaders can shape the direction of our community through organizing events and initiatives.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
                asChild
              >
                <Link href="/opportunities/leadership">
                  Apply Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Card 3: Collaborate */}
          <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-6 bg-green-50 flex items-center justify-center">
              <Handshake size={64} className="text-green-600" />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl font-semibold mb-3">
                Collaborate
              </CardTitle>
              <CardDescription className="text-gray-600">
                Bring your ideas to life through collaboration. Work on research projects, organize workshops, contribute to open-source initiatives, or partner with other members on innovative solutions.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                asChild
              >
                <Link href="/opportunities/collaboration">
                  Get Involved
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}; 