import { serviceSitemapUrls, urlSetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export function GET() {
  return xmlResponse(urlSetXml(serviceSitemapUrls()));
}
