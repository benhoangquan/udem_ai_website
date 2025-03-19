import { ActivityCarousel } from './ActivityCarousel';
import { ActivityCard } from './ActivityCard';
import { SanityActivity } from '@/lib/types';

interface ActivitiesProps {
  activities: SanityActivity[];
  title?: string;
  description?: string;
}

export const Activities = ({ activities, title = "What Do We Do?", description }: ActivitiesProps) => {
  return (
    <div id="activities">
      <ActivityCarousel activities={activities} title={title} description={description} />
    </div>
  );
};

export { ActivityCarousel } from './ActivityCarousel';
export { ActivityCard } from './ActivityCard'; 