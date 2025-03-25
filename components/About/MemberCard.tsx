import Image from 'next/image';
import { SanityMember } from '@/lib/types';
import { urlForImage } from '@/lib/sanity.image';
import { Card, CardContent, CardTitle, CardBar } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MemberCardProps {
  member: SanityMember;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const firstInitial = member.name.charAt(0);
  
  // Get color scheme based on member role
  const getRoleColorScheme = () => {
    switch (member.role) {
      case 'executive':
        return 'primary';
      case 'member':
        return 'secondary';
      case 'alumni':
        return 'accent';
      default:
        return 'default';
    }
  };
  
  return (
    <Card 
      className="h-full w-full rounded-xl overflow-hidden border-0 shadow-lg flex flex-col bg-white dark:bg-gray-900"
      variant="default"
      size="md"
    >
      <div className="relative w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800">
        {member.avatar ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src={urlForImage(member.avatar).url()}
              alt={member.name}
              fill
              className="object-contain rounded-xl"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="h-36 w-36">
              <AvatarFallback className="text-6xl">{firstInitial}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      <CardContent className="flex flex-col flex-grow p-6 pt-8 pb-8">
        <CardBar 
          colorScheme={getRoleColorScheme()} 
          size="sm" 
          className="mb-4"
        />
        <CardTitle 
          colorScheme="default" 
          size="md" 
          className="text-xl font-bold mb-2 text-nowrap"
        >
          {member.name}
        </CardTitle>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {member.executivePosition}
        </p>
      </CardContent>
    </Card>
  );
}; 