import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'content', 'posts');

export function getPostMeta() {
  const indexPath = path.join(postsDir, 'index.json');
  const raw = fs.readFileSync(indexPath, 'utf8');
  const posts = JSON.parse(raw);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs() {
  return getPostMeta().map((post) => post.slug);
}

export function getPostBySlug(slug) {
  const posts = getPostMeta();
  const meta = posts.find((post) => post.slug === slug);
  if (!meta) {
    throw new Error(`Unknown post slug: ${slug}`);
  }
  const htmlPath = path.join(postsDir, `${slug}.html`);
  let content = fs.readFileSync(htmlPath, 'utf8');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath) {
    const prefix = basePath === '/' ? '' : basePath;
    const attrRegex = /(src|href)=["']\/(images\/[^"']+)["']/g;
    content = content.replace(attrRegex, `$1="${prefix}/$2"`);
  }
  return { ...meta, content };
}
