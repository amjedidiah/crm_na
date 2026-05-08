import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import type { PropsWithChildren } from "react";
import Footer from "@/components/layout/Footer";
import FloatingGiveButton from "@/components/layout/FloatingGiveButton";
import Navbar from "@/components/layout/Navbar";
import NavOffset from "@/components/layout/NavOffset";
import PageTransition from "@/components/layout/PageTransition";
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
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
};

function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen bg-(--color-bg-canvas) text-(--color-fg-primary)">
        <Navbar />
        <NavOffset />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <FloatingGiveButton />
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
