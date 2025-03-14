import { GetStaticPaths, GetStaticProps } from 'next';
import { PostDetail } from '@/components/posts/PostDetail';
import { BlogController } from '@/lib/controllers/blog-controller';
import { SanityPost } from '@/lib/types';

interface PostPageProps {
  post: SanityPost;
}

export default function BlogPostPage({ post }: PostPageProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <PostDetail post={post} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogController.getAllPostSlugs();
  
  const paths = slugs.map(({ slug }) => ({
    params: { slug }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await BlogController.getPostDetail(slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      post
    },
    revalidate: 600 // Revalidate every 10 minutes
  };
}; 