import { GetStaticProps } from "next";
import { Hero } from "@/components/Hero";
import { getGeneralInfo, getAllActivities, getAllResources, getAllExecutiveMembers } from "@/lib/sanity/queries";
import { SanityGeneralInfo, SanityActivity, SanityResource, SanityMember } from "@/lib/types";
import { Activities } from "@/components/Activities";
import { Resources } from "@/components/Resources";
import { About } from "@/components/About";
import { GetInvolved } from "@/components/GetInvolved";
import { useState, useEffect } from "react";
import { LoadingIndicator } from "@/components/ui/spinner";

interface HomePageProps {
    generalInfo: SanityGeneralInfo;
    activities: SanityActivity[];
    resources: SanityResource[];
    executiveMembers: SanityMember[];
}

export default function HomePage({ generalInfo, activities, resources, executiveMembers }: HomePageProps) {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate content loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);
    
    if (isLoading) {
        return <LoadingIndicator message="Loading UdemAI..." />;
    }

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
    try {
        const generalInfo = await getGeneralInfo();
        const activities = await getAllActivities();
        const resources = await getAllResources();
        const executiveMembers = await getAllExecutiveMembers();

        return {
            props: {
                generalInfo,
                activities,
                resources,
                executiveMembers,
            },
            revalidate: 3600, // Revalidate every hour
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        
        // Return minimal props on error
        return {
            props: {
                generalInfo: {},
                activities: [],
                resources: [],
                executiveMembers: [],
            },
            revalidate: 60, // Try again more quickly on error
        };
    }
};