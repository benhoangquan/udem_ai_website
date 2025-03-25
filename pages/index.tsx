import { GetStaticProps } from "next";
import { Hero } from "@/components/Hero";
import { getGeneralInfo, getAllActivities, getAllResources, getAllExecutiveMembers } from "@/lib/sanity/queries";
import { SanityGeneralInfo, SanityActivity, SanityResource, SanityMember } from "@/lib/types";
import { Activities } from "@/components/Activities";
import { Resources } from "@/components/Resources";
import { About } from "@/components/About";
import { GetInvolved } from "@/components/GetInvolved";

interface HomePageProps {
    generalInfo: SanityGeneralInfo;
    activities: SanityActivity[];
    resources: SanityResource[];
    executiveMembers: SanityMember[];
}

export default function HomePage({ generalInfo, activities, resources, executiveMembers }: HomePageProps) {
    return (
        <>
            <Hero generalInfo={generalInfo} />
            <Activities 
                activities={activities} 
                title="What Do We Do?" 
                description="Explore our activities and learn how we're building a community of AI enthusiasts." 
            />
            <About 
                members={executiveMembers} 
                title="Meet the Team" 
                description="Get to know the passionate individuals behind our organization." 
            />
            <GetInvolved 
                title="Get Involved" 
                description="Join our community of AI enthusiasts and make a difference. Whether you're looking to connect, lead, or collaborate, there's a place for you." 
            />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const generalInfo = await getGeneralInfo();
    const activities = await getAllActivities();
    const resources = await getAllResources(); // Initial limit of 6 resources (2x3 grid)
    const executiveMembers = await getAllExecutiveMembers();

    return {
        props: {
            generalInfo,
            activities,
            resources,
            executiveMembers,
        },
        revalidate: 3600,
    };
};