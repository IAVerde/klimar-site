import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE.url}/precos`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE.url}/sobre`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE.url}/termos`, lastModified: now, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE.url}/privacidade`, lastModified: now, priority: 0.3, changeFrequency: "yearly" },
  ];
}
