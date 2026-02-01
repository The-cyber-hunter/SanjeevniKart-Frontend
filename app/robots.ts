// app/robots.ts
import { NextResponse } from "next/server";

export function GET() {
  const siteUrl = "https://www.sanjeevnikart.in";

  const content = `
User-agent: *
Disallow:

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
  `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
