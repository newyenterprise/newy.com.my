import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  titleTemplate: '%s | Newy Enterprise',
  defaultTitle: 'Newy Enterprise - Digital Agency in Malaysia',
  description: 'Newy Enterprise is a leading digital agency in Malaysia. We provide professional digital solutions, web development, mobile apps, AI automation, and digital marketing services to help businesses grow.',
  canonical: 'https://newy.com.my',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: 'https://newy.com.my',
    siteName: 'Newy Enterprise',
    title: 'Newy Enterprise - Digital Agency in Malaysia',
    description: 'Newy Enterprise is a leading digital agency in Malaysia. We provide professional digital solutions, web development, mobile apps, AI automation, and digital marketing services to help businesses grow.',
    images: [
      {
        url: 'https://newy.com.my/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Newy Enterprise - Digital Agency in Malaysia',
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
      href: '/media/newy_icon_main.png?v=2',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/media/newy_icon_main.png?v=2',
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

