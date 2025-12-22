import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/toaster";
import { LayoutWrapper } from "../components/layout-wrapper";
import { AuthProvider } from "../contexts/auth-context";
import { AnalyticsWrapper } from "../components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Newy Enterprise - Digital Agency in Malaysia",
    template: "%s | Newy Enterprise"
  },
  description: "Newy Enterprise is a leading digital agency in Malaysia. We provide professional digital solutions, web development, mobile apps, AI automation, and digital marketing services to help businesses grow.",
  keywords: ["digital agency Malaysia", "web development Malaysia", "app development Malaysia", "AI automation Malaysia", "digital marketing Malaysia", "Malaysia digital agency", "Newy Enterprise"],
  authors: [{ name: "NewY Enterprise" }],
  creator: "NewY Enterprise",
  publisher: "NewY Enterprise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://newy.com.my'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://newy.com.my",
    title: "Newy Enterprise - Digital Agency in Malaysia",
    description: "Newy Enterprise is a leading digital agency in Malaysia. We provide professional digital solutions, web development, mobile apps, AI automation, and digital marketing services to help businesses grow.",
    siteName: "Newy Enterprise",
    images: [
      {
        url: "https://newy.com.my/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Newy Enterprise - Digital Agency in Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newy Enterprise - Digital Agency in Malaysia",
    description: "Newy Enterprise is a leading digital agency in Malaysia. We provide professional digital solutions, web development, mobile apps, AI automation, and digital marketing services to help businesses grow.",
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
    google: "your-google-verification-code",
  },
  other: {
    "theme-color": "#1c0940",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

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
