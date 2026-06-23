import { blogSitemapUrls, urlSetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET() {
  return xmlResponse(urlSetXml(await blogSitemapUrls()));
}
