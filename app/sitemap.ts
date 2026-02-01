// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sanjeevnikart.in";

  const pages = ["", "farmer-sell", "wholesale", "retail", "customer"];
  const now = new Date().toISOString();

  return pages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
