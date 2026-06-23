import { staticPages, urlSetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export function GET() {
  return xmlResponse(
    urlSetXml(
      staticPages.map((page) => ({
        ...page,
        changeFrequency: page.path === "/" ? "weekly" : "monthly",
      }))
    )
  );
}
