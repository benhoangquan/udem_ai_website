import { GetStaticProps } from "next";
import { Hero } from "@/components/Hero";
import { getGeneralInfo, getAllActivities, getAllResources } from "@/lib/sanity/queries";
import { SanityGeneralInfo, SanityActivity, SanityResource } from "@/lib/types";
import { ActivityCarousel } from "@/components/Activities/ActivityCarousel";
import { ResourceGrid } from "@/components/Resources/ResourceGrid";
import { GetInvolved } from "@/components/GetInvolved";

interface HomePageProps {
    generalInfo: SanityGeneralInfo;
    activities: SanityActivity[];
    resources: SanityResource[];
}

export default function HomePage({ generalInfo, activities, resources }: HomePageProps) {
    return (
        <>
            <Hero generalInfo={generalInfo} />
            <div id="activities">
                <ActivityCarousel activities={activities} title="What Do We Do?" />
            </div>
            <div id="resources">
                <ResourceGrid resources={resources} title="Learning Resources" />
            </div>
            <GetInvolved />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const generalInfo = await getGeneralInfo();
    const activities = await getAllActivities();
    const resources = await getAllResources(); // Initial limit of 6 resources (2x3 grid)

    return {
        props: {
            generalInfo,
            activities,
            resources,
        },
        revalidate: 3600,
    };
};