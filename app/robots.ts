import { NextResponse } from "next/server";

export const GET = async () => {
  const content = `
User-agent: *
Allow: /

Sitemap: https://www.sanjeevnikart.in/sitemap.xml
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
};
