import { NextResponse } from "next/server";

export const GET = () => {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://www.sanjeevnikart.in/sitemap.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
