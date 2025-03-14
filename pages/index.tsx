import { GetStaticProps } from "next";
import { Hero } from "@/components/Hero";
import { getGeneralInfo, getAllActivities } from "@/lib/sanity/queries";
import { SanityGeneralInfo, SanityActivity } from "@/lib/types";
import { ActivityCarousel } from "@/components/Activities/ActivityCarousel";

interface HomePageProps {
    generalInfo: SanityGeneralInfo;
    activities: SanityActivity[];
}

export default function HomePage({ generalInfo, activities }: HomePageProps) {
    return (
        <>
            <Hero generalInfo={generalInfo} />
            <ActivityCarousel activities={activities} title="What Do We Do?" />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const generalInfo = await getGeneralInfo();
    const activities = await getAllActivities();

    return {
        props: {
            generalInfo,
            activities,
        },
        revalidate: 3600,
    };
};