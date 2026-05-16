import type { MetadataRoute } from "next";
import { requestAccessUrl, siteRootUrl } from "./lib/site";

export const dynamic = "force-static";

const lastModified = new Date("2026-05-17T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteRootUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: requestAccessUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
