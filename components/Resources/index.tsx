import { ResourceGrid } from './ResourceGrid';
import { SanityResource } from '@/lib/types';

interface ResourcesProps {
  resources: SanityResource[];
  title?: string;
  description?: string;
}

export const Resources = ({ resources, title = "Learning Resources", description }: ResourcesProps) => {
  return (
    <div id="resources">
      <ResourceGrid resources={resources} title={title} description={description} />
    </div>
  );
};

export { ResourceGrid } from './ResourceGrid';
export { ResourceCard } from './ResourceCard'; 