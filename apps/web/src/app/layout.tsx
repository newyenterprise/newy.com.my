import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/toaster";
import { LayoutWrapper } from "../components/layout-wrapper";
import { AuthProvider } from "../contexts/auth-context";
import { AnalyticsWrapper } from "../components/analytics";
import { getServerTranslations } from "@/lib/i18n/server";
import { defaultLocale } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('en');
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
      canonical: '/',
      languages: {
        'en': `${baseUrl}`,
        'bm': `${baseUrl}/bm`,
        'x-default': `${baseUrl}`,
      },
    },
    openGraph: {
      type: "website",
      locale: 'en_MY',
      alternateLocale: 'ms_MY',
      url: `${baseUrl}`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CDQ7MM9');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href="https://newy.com.my" />
        <link rel="alternate" hrefLang="bm" href="https://newy.com.my/bm" />
        <link rel="alternate" hrefLang="x-default" href="https://newy.com.my" />
        <link rel="icon" href="/media/newy_icon_main.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/media/newy_icon_main.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5CDQ7MM9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster />
            <AnalyticsWrapper />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
