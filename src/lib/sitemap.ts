import { prisma } from "@/lib/prisma";
import {
  absoluteLocalizedUrl,
  localeAlternates,
  locales,
  siteUrl,
  type Locale,
} from "@/lib/routing";
import { serviceLandingPages } from "@/lib/service-landing-pages";

type SitemapUrl = {
  path: string;
  lastModified?: Date | string | null;
  changeFrequency?: string;
  priority?: number;
  images?: string[];
};

const staticLastModified = "2026-06-21T00:00:00.000Z";

export const sitemapFiles = [
  "sitemap-pages.xml",
  "sitemap-services.xml",
  "sitemap-portfolio.xml",
  "sitemap-blog.xml",
  "sitemap-images.xml",
];

export const staticPages: SitemapUrl[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/tools/automation-roi-calculator", priority: 0.85 },
  { path: "/quiz", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/portfolio", priority: 0.75 },
  { path: "/about", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function lastModified(value: SitemapUrl["lastModified"]) {
  if (!value) return staticLastModified;
  return value instanceof Date ? value.toISOString() : value;
}

function absoluteImageUrl(src: string) {
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl}${src.startsWith("/") ? src : `/${src}`}`;
}

function alternateLinks(path: string) {
  const links = locales
    .map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${localeAlternates[locale]}" href="${escapeXml(
          absoluteLocalizedUrl(path, locale)
        )}" />`
    )
    .join("");

  return `${links}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
    absoluteLocalizedUrl(path, "uz")
  )}" />`;
}

function urlEntry(url: SitemapUrl, locale: Locale, includeImages = false) {
  const loc = absoluteLocalizedUrl(url.path, locale);
  const images =
    includeImages && url.images
      ? url.images
          .map(
            (image) =>
              `<image:image><image:loc>${escapeXml(
                absoluteImageUrl(image)
              )}</image:loc></image:image>`
          )
          .join("")
      : "";

  return [
    "<url>",
    `<loc>${escapeXml(loc)}</loc>`,
    alternateLinks(url.path),
    `<lastmod>${escapeXml(lastModified(url.lastModified))}</lastmod>`,
    url.changeFrequency ? `<changefreq>${url.changeFrequency}</changefreq>` : "",
    typeof url.priority === "number" ? `<priority>${url.priority.toFixed(2)}</priority>` : "",
    images,
    "</url>",
  ].join("");
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}

export function sitemapIndexXml() {
  const now = new Date().toISOString();
  const items = sitemapFiles
    .map(
      (file) =>
        `<sitemap><loc>${siteUrl}/${file}</loc><lastmod>${now}</lastmod></sitemap>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`;
}

export function urlSetXml(urls: SitemapUrl[], includeImages = false) {
  const imageNamespace = includeImages
    ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : "";
  const entries = urls
    .flatMap((url) => locales.map((locale) => urlEntry(url, locale, includeImages)))
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"${imageNamespace}>${entries}</urlset>`;
}

export function serviceSitemapUrls(): SitemapUrl[] {
  return serviceLandingPages.map((page) => ({
    path: `/services/${page.slug}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));
}

export async function portfolioSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
        coverImage: true,
        images: true,
      },
      orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    });

    return projects.map((project) => ({
      path: `/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [project.coverImage, ...project.images].filter(Boolean),
    }));
  } catch {
    return [];
  }
}

export async function blogSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
        coverImage: true,
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.65,
      images: post.coverImage ? [post.coverImage] : [],
    }));
  } catch {
    return [];
  }
}

export async function imageSitemapUrls(): Promise<SitemapUrl[]> {
  const [portfolioUrls, blogUrls] = await Promise.all([
    portfolioSitemapUrls(),
    blogSitemapUrls(),
  ]);

  return [
    {
      path: "/",
      lastModified: staticLastModified,
      priority: 1,
      images: [
        "/images/fullfocus-logo.svg",
        "/images/hero-automation-dashboard.avif",
      ],
    },
    ...portfolioUrls.filter((url) => url.images?.length),
    ...blogUrls.filter((url) => url.images?.length),
  ];
}
