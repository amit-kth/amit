import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { getRequestSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteName = `${profile.name} — Portfolio`;

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await getRequestSiteUrl();
  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: profile.seo.title,
    description: profile.seo.description,
    applicationName: siteName,
    category: "technology",
    openGraph: {
      type: "website",
      title: profile.seo.title,
      description: profile.seo.description,
      siteName,
      images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: profile.seo.imageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: profile.seo.title,
      description: profile.seo.description,
      images: ["/twitter-image"],
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#F4FBE4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
