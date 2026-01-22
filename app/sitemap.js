import { getPostMeta } from '@/lib/posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.whoisankit.xyz';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const withBase = (path) => `${siteUrl}${basePath}${path}`;

export const dynamic = 'force-static';

export default function sitemap() {
  const posts = getPostMeta();
  const postEntries = posts.map((post) => ({
    url: withBase(`/posts/${post.slug}/`),
    lastModified: new Date(post.date)
  }));

  return [
    { url: withBase('/'), lastModified: new Date() },
    { url: withBase('/posts/'), lastModified: new Date() },
    { url: withBase('/search/'), lastModified: new Date() },
    { url: withBase('/categories/'), lastModified: new Date() },
    { url: withBase('/about/'), lastModified: new Date() },
    ...postEntries
  ];
}
