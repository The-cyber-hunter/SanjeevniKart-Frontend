import { NextResponse } from "next/server";

export const GET = () => {
  const baseUrl = "https://www.sanjeevnikart.in";

  const urls = [
    "/",
    "/wholesale",
    "/retail",
    "/customer",
    "/farmer-sell"
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )
    .join("")}
</urlset>`.trim();

  return new NextResponse(sitemapXml, {
    headers: { "Content-Type": "application/xml" },
  });
};
