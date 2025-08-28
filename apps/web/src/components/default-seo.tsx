import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  titleTemplate: '%s | DigitalLinked',
  defaultTitle: 'DigitalLinked - Digital Solutions & Web Development',
  description: 'Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.',
  canonical: 'https://digitallinked.com.au',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://digitallinked.com.au',
    siteName: 'DigitalLinked',
    title: 'DigitalLinked - Digital Solutions & Web Development',
    description: 'Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.',
    images: [
      {
        url: 'https://digitallinked.com.au/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DigitalLinked - Digital Solutions & Web Development',
      },
    ],
  },
  twitter: {
    handle: '@digitallinked',
    site: '@digitallinked',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#1c0940',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico?v=2',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png?v=2',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest?v=2',
    },
  ],
};

export function DefaultSEO() {
  return <DefaultSeo {...DEFAULT_SEO} />;
}

