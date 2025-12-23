import type { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('bm');
  const baseUrl = 'https://newy.com.my';
  
  const metadata: Metadata = {
    title: {
      default: t("seo.defaultTitle"),
      template: `%s | Newy Enterprise`
    },
    description: t("seo.defaultDescription"),
    keywords: t("seo.keywords").split(", "),
    authors: [{ name: "NewY Enterprise" }],
    creator: "NewY Enterprise",
    publisher: "NewY Enterprise",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/bm',
      languages: {
        'en': `${baseUrl}`,
        'bm': `${baseUrl}/bm`,
        'x-default': `${baseUrl}`,
      },
    },
    openGraph: {
      type: "website",
      locale: 'ms_MY',
      alternateLocale: 'en_MY',
      url: `${baseUrl}/bm`,
      title: t("seo.defaultTitle"),
      description: t("seo.defaultDescription"),
      siteName: "Newy Enterprise",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("seo.defaultTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.defaultTitle"),
      description: t("seo.defaultDescription"),
      creator: "@newyenterprise",
      site: "@newyenterprise",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "OIZtBsB8Ea4HW_XBx4xoa-iWCy85z56rgTF8Ys-nwEc",
    },
    other: {
      "theme-color": "#1c0940",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };

  return metadata;
}

export default function BMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a nested layout - it should not include html/body tags
  // The root layout already handles those
  return <>{children}</>;
}

