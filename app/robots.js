const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.whoisankit.xyz';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const withBase = (path) => `${siteUrl}${basePath}${path}`;

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: withBase('/sitemap.xml')
  };
}
