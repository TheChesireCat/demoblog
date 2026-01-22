import { getPostMeta } from '@/lib/posts';
import PostSearch from '@/app/components/PostSearch';

export const metadata = {
  title: 'Posts | Ankit Ramakrishnan'
};

export default function PostsPage() {
  const posts = getPostMeta();

  return (
    <div className="shell">
      <h1 className="section-title">Posts</h1>
      <PostSearch posts={posts} />
    </div>
  );
}
