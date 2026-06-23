import { sitemapIndexXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export function GET() {
  return xmlResponse(sitemapIndexXml());
}
