import { TeamCarousel } from './TeamCarousel';
import { SanityMember } from '@/lib/types';

interface AboutProps {
  members: SanityMember[];
  title?: string;
  description?: string;
}

export const About = ({ members, title = "Meet the Team", description }: AboutProps) => {
  return (
    <div id="about">
      <TeamCarousel members={members} title={title} description={description} />
    </div>
  );
};

export { TeamCarousel } from './TeamCarousel';
export { MemberCard } from './MemberCard'; 