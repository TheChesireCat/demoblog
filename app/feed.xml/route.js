import { getPostMeta } from '@/lib/posts';

export const dynamic = 'force-static';

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.whoisankit.xyz';
  const posts = getPostMeta();
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/posts/${post.slug}/`;
      return `\n  <item>\n    <title>${escapeXml(post.title)}</title>\n    <link>${link}</link>\n    <guid>${link}</guid>\n    <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n    <description>${escapeXml(post.description)}</description>\n  </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Ankit Ramakrishnan</title>\n  <link>${siteUrl}</link>\n  <description>Projects, essays, and data work from Ankit Ramakrishnan.</description>\n  ${items}\n</channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
