import { GetStaticProps } from "next";

import { Hero } from "@/components/Hero";
import { getPosts } from "@/lib/service";
import CalendarPage from "./calendar";
import PostsPage from "./posts";
import ActivitiesPage from "./activities";

export default function HomePage({ posts }: { posts: any }) {
    return (
        <>
            <Hero />
            <ActivitiesPage />
            <CalendarPage />
            <PostsPage posts={posts} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getPosts(100); // retrieve first 100 posts

    return {
        props: {
            posts,
        },
        revalidate: 3600,
    };
};