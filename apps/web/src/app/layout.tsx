import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/toaster";
import { Navigation } from "../components/navigation";
import { ChatAssistant } from "../components/chat-assistant";
import { Footer } from "../components/footer";
import { AuthProvider } from "../contexts/auth-context";

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
  title: "Digital Linked - Your Strategic Partner for Digital Success",
  description: "We craft stunning websites, build innovative apps, implement intelligent AI automation, and drive impactful marketing strategies to grow your business.",
  keywords: ["web development", "app development", "AI automation", "digital marketing", "agency"],
  authors: [{ name: "Digital Linked" }],
  creator: "Digital Linked",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitallinked.com.au",
    title: "Digital Linked - Your Strategic Partner for Digital Success",
    description: "We craft stunning websites, build innovative apps, implement intelligent AI automation, and drive impactful marketing strategies to grow your business.",
    siteName: "Digital Linked",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Linked - Your Strategic Partner for Digital Success",
    description: "We craft stunning websites, build innovative apps, implement intelligent AI automation, and drive impactful marketing strategies to grow your business.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <ChatAssistant />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
