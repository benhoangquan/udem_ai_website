import { GetStaticProps } from 'next';
import { getAllResources } from '@/lib/sanity/queries';
import { SanityResource } from '@/lib/types';
import { ResourceGrid } from '@/components/Resources/ResourceGrid';

interface ResourcesPageProps {
  resources: SanityResource[];
}

export default function ResourcesPage({ resources }: ResourcesPageProps) {
  return (
    <div className="min-h-screen">
      <ResourceGrid 
        resources={resources} 
        title="All Resources" 
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const resources = await getAllResources();

  return {
    props: {
      resources,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 