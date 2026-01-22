import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import Comments from '@/app/components/Comments';
import CodeHighlight from '@/app/components/CodeHighlight';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} | Ankit Ramakrishnan`,
    description: post.description
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <div className="shell">
      <div className="post-layout">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">{post.date}</div>
          <p>{post.description}</p>
          <div className="tag-list">
            {post.categories.map((category) => (
              <span key={category} className="tag">
                {category}
              </span>
            ))}
          </div>
        </header>
        <article className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        <CodeHighlight />
        <Comments title={post.title} />
      </div>
    </div>
  );
}
