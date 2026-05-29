import { NextRequest, NextResponse } from "next/server";

import { getBackendOrigin } from "@/lib/backend-origin";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "origin",
  "referer",
  // Node fetch decompresses the body; forwarding these breaks JSON parsing in axios.
  "content-encoding",
  "content-length",
]);

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxyRequest(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const upstream = new URL(`/api/${path.join("/")}`, getBackendOrigin());
  upstream.search = req.nextUrl.search;

  const headers = new Headers();
  headers.set("Accept", "application/json");
  req.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    headers.set(key, value);
  });

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  const upstreamRes = await fetch(upstream.toString(), init);
  const responseHeaders = new Headers();
  upstreamRes.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    responseHeaders.set(key, value);
  });

  return new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
