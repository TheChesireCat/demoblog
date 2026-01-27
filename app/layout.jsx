import Script from 'next/script';
import './globals.css';
import SiteHeader from './components/SiteHeader';

export const metadata = {
  title: 'Ankit Ramakrishnan | Notes, Algorithms, Visualizations',
  description: 'Projects, essays, and data work from Ankit Ramakrishnan.'
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-PF0NE6Y5H3';

  return (
    <html lang="en">
      <head>
        <link id="hljs-theme-light" rel="stylesheet" href="/hljs/github.css" media="(prefers-color-scheme: light)" />
        <link id="hljs-theme-dark" rel="stylesheet" href="/hljs/github-dark.css" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga-setup" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
        </Script>
        <div className="site">
          <SiteHeader />
          <main>{children}</main>
          <footer className="footer">
            Built with ❤️ and Next.js.
          </footer>
        </div>
      </body>
    </html>
  );
}
