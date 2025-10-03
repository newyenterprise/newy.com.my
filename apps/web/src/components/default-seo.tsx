import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  titleTemplate: '%s | NewY Enterprise',
  defaultTitle: 'NewY Enterprise - Digital Solutions & Web Development',
  description: 'Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.',
  canonical: 'https://newy.com.my',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: 'https://newy.com.my',
    siteName: 'NewY Enterprise',
    title: 'NewY Enterprise - Digital Solutions & Web Development',
    description: 'Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.',
    images: [
      {
        url: 'https://newy.com.my/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NewY Enterprise - Digital Solutions & Web Development',
      },
    ],
  },
  twitter: {
    handle: '@newyenterprise',
    site: '@newyenterprise',
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

