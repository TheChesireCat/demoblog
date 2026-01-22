import Link from 'next/link';
import { getPostMeta } from '@/lib/posts';

export const metadata = {
  title: 'Tags | Ankit Ramakrishnan'
};

export default function CategoriesPage() {
  const posts = getPostMeta();
  const counts = posts.reduce((acc, post) => {
    post.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  const tags = Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  return (
    <div className="shell">
      <h1 className="section-title">Tags</h1>
      <div className="tag-grid">
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`} className="tag-card">
            <span className="tag-card__name">{tag}</span>
            <span className="tag-card__count">{count} post{count === 1 ? '' : 's'}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
