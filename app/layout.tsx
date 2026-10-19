import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import { profile } from "@/data/profile";
import { getRequestSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./interaction.css";

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
  themeColor: "#F4F1EA",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
