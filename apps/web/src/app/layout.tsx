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
    default: "DigitalLinked - Digital Solutions & Web Development",
    template: "%s | DigitalLinked"
  },
  description: "Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.",
  keywords: ["web development", "app development", "AI automation", "digital marketing", "agency", "digital solutions"],
  authors: [{ name: "DigitalLinked" }],
  creator: "DigitalLinked",
  publisher: "DigitalLinked",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://digitallinked.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://digitallinked.com.au",
    title: "DigitalLinked - Digital Solutions & Web Development",
    description: "Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.",
    siteName: "DigitalLinked",
    images: [
      {
        url: "https://digitallinked.com.au/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DigitalLinked - Digital Solutions & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalLinked - Digital Solutions & Web Development",
    description: "Professional digital solutions, web development, and technology services. We help businesses grow with cutting-edge digital strategies and custom web applications.",
    creator: "@digitallinked",
    site: "@digitallinked",
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
    "apple-mobile-web-app-capable": "yes",
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
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
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
