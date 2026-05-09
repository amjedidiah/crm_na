import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import ConventionRegistrationBanner from "@/components/layout/ConventionRegistrationBanner";
import Footer from "@/components/layout/Footer";
import FloatingGiveButton from "@/components/layout/FloatingGiveButton";
import Navbar from "@/components/layout/Navbar";
import NavOffset from "@/components/layout/NavOffset";
import PageTransition from "@/components/layout/PageTransition";
import ThemeProvider from "@/components/shared/ThemeProvider";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/mock-data";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f141c" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  icons: {
    icon: "/logo-light.svg",
  },
  twitter: {
    card: "summary_large_image",
  },
};

function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen bg-(--surface-page) text-(--text-primary)">
        <ThemeProvider>
          <Suspense fallback={null}>
            <ConventionRegistrationBanner />
          </Suspense>
          <Navbar />
          <NavOffset />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <FloatingGiveButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
