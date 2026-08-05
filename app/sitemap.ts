import type { MetadataRoute } from "next";
import { siteRootUrl } from "./lib/site";
import { siteLastModified } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteRootUrl,
      lastModified: new Date(siteLastModified),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
