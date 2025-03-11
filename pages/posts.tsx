import { PostBlock } from "@/components/PostBlock";

export default function PostsPage({ posts }: { posts: any }) {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Latest posts</h1>
            <div className="my-6 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {posts.map((post: any) => {
                    return <PostBlock key={post.slug} post={post} />;
                })}
            </div>
        </div>
    );
}