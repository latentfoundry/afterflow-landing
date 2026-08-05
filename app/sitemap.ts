import type { MetadataRoute } from "next";
import { siteRootUrl } from "./lib/site";

export const dynamic = "force-static";

const lastModified = new Date("2026-08-05T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteRootUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
