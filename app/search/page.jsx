import { getPostMeta } from '@/lib/posts';
import PostSearch from '@/app/components/PostSearch';

export const metadata = {
  title: 'Search | Ankit Ramakrishnan'
};

export default function SearchPage() {
  const posts = getPostMeta();

  return (
    <div className="shell">
      <h1 className="section-title">Search</h1>
      <PostSearch posts={posts} />
    </div>
  );
}
