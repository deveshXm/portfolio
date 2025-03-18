import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import PageTransition from '@/components/PageTransition';
import SmoothScroll from '@/components/SmoothScroll';
import portfolioData from '@/data/portfolio.json';
import { Analytics } from '@vercel/analytics/next';

// Use Google Fonts instead of local fonts for now
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const { meta } = portfolioData;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.author }],
  creator: meta.author,
  publisher: meta.author,
  metadataBase: new URL(meta.siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.siteUrl,
    siteName: meta.title,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
    locale: meta.locale,
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    creator: meta.twitterHandle,
    images: [meta.ogImage],
  },
  themeColor: meta.themeColor,
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-256.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-128.png' },
    ],
  },
};

// JSON-LD structured data for better SEO
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.personal.name,
  description: portfolioData.personal.professionalSummary,
  url: meta.siteUrl,
  image: meta.ogImage,
  jobTitle: portfolioData.personal.tagline,
  sameAs: [
    portfolioData.social.github,
    portfolioData.social.linkedin,
    portfolioData.social.twitter,
  ],
  knowsLanguage: portfolioData.personal.languages?.map(lang => lang.split('(')[0].trim()),
  address: {
    '@type': 'PostalAddress',
    addressLocality: portfolioData.personal.location
  },
  email: portfolioData.personal.contact.email
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="Content-Security-Policy" content="transform-box: view-box; will-change: transform;" />
      </head>
      <body className="min-h-screen antialiased font-sans">
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}