import Link from 'next/link';
import { MessageSquare, Users, Handshake } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter, CardBar, cardBarVariants } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

interface GetInvolvedProps {
  title?: string;
  description?: string;
}

type CardScheme = VariantProps<typeof cardBarVariants>['colorScheme'];

interface CardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
  isExternal: boolean;
  colorScheme: CardScheme;
}

export const GetInvolved = ({ 
  title = "Get Involved", 
  description = "Join our community of AI enthusiasts and make a difference. Whether you're looking to connect, lead, or collaborate, there's a place for you."
}: GetInvolvedProps) => {
  // Define card items
  const cards: CardItem[] = [
    {
      title: "Join Discord",
      description: "Connect with a vibrant community of AI enthusiasts, participate in discussions, get help with projects, and stay updated on events and opportunities.",
      icon: <MessageSquare size={64} className="text-blue-600" />,
      link: "https://discord.com/invite/YOUR_DISCORD_INVITE",
      buttonText: "Join Now",
      isExternal: true,
      colorScheme: "primary"
    },
    {
      title: "Become a Member",
      description: "Join our official membership program to gain access to exclusive workshops, mentorship opportunities, networking events, and contribute to club initiatives.",
      icon: <Users size={64} className="text-blue-600" />,
      link: "/join",
      buttonText: "Apply Now",
      isExternal: false,
      colorScheme: "accent"
    },
    {
      title: "Partner With Us",
      description: "Collaborate with our organization for events, hackathons, research initiatives, or sponsorship opportunities. We're open to partnerships that advance AI education and innovation.",
      icon: <Handshake size={64} className="text-blue-600" />,
      link: "/contact",
      buttonText: "Get in Touch",
      isExternal: false,
      colorScheme: "success"
    }
  ];

  return (
    <section id="opportunities" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <CardTitle 
            colorScheme="default"
            size="lg"
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            {title}
          </CardTitle>
          <CardBar colorScheme="primary" size="md" className="mb-8" />
          <CardDescription 
            colorScheme="muted"
            size="md"
            className="text-lg text-center max-w-3xl"
          >
            {description}
          </CardDescription>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card 
              key={index}
              className="overflow-hidden flex flex-col h-full"
              variant="default"
              size="md"
            >
              <CardHeader className="p-6 flex items-center justify-center">
                {card.icon}
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardBar 
                  colorScheme={card.colorScheme} 
                  size="sm" 
                  className="mb-3"
                />
                <CardTitle 
                  colorScheme="default"
                  size="md"
                  className="text-2xl font-semibold mb-3"
                >
                  {card.title}
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  className="text-gray-600"
                >
                  {card.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  variant="blue" 
                  className="w-full" 
                  asChild
                >
                  {card.isExternal ? (
                    <a 
                      href={card.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {card.buttonText}
                    </a>
                  ) : (
                    <Link href={card.link}>
                      {card.buttonText}
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 