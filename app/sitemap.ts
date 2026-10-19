import type { MetadataRoute } from "next";
import { getRequestSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getRequestSiteUrl();
  if (!siteUrl) return [];
  return [{
    url: new URL("/", siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 1,
  }];
}
