import Image from 'next/image';
import { SanityMember } from '@/lib/types';
import { urlForImage } from '@/lib/sanity.image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MemberCardProps {
  member: SanityMember;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const firstInitial = member.name.charAt(0);
  
  return (
    <Card className="h-full rounded-xl overflow-hidden border-0 shadow-lg flex flex-col">
      <div className="relative w-full h-80 bg-blue-100">
        {member.avatar ? (
          <Image 
            src={urlForImage(member.avatar).url()}
            alt={member.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-blue-200">
            <Avatar className="h-36 w-36">
              <AvatarFallback className="text-6xl">{firstInitial}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      <CardContent className="flex flex-col flex-grow p-6 pt-8 pb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h3>
        <p className="text-sm text-blue-700 font-medium">{member.executivePosition}</p>
      </CardContent>
    </Card>
  );
}; 