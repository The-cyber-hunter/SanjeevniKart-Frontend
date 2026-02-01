// app/robots.ts
import type { MetadataRoute } from "next";

export const GET = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.sanjeevnikart.in/sitemap.xml",
  };
};
