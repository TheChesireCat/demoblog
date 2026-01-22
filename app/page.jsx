import Link from 'next/link';
import { getPostMeta } from '@/lib/posts';

export default function HomePage() {
  const posts = getPostMeta();
  const featured = posts.slice(0, 2);

  return (
    <div className="shell">
      <section className="hero">
        <div>
          <h1>Field Notes from systems, data, and side quests.</h1>
          <p>
            Expect algorithms, visualization work, and the occasional long-form narrative about
            solving problems I could not let go.
          </p>
        </div>
      </section>

      <h2 className="section-title">Featured posts</h2>
      <div className="post-grid">
        {featured.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <div className="post-meta">{post.date}</div>
            <p>{post.description}</p>
            <div className="tag-list">
              {post.categories.map((category) => (
                <span key={category} className="tag">
                  {category}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Everything</h2>
      <Link className="post-card" href="/posts">
        Browse the full archive of posts.
      </Link>
    </div>
  );
}
