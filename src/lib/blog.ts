import { prisma } from "@/lib/prisma";

export type PublicBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  authorName: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const publicPostSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImage: true,
  category: true,
  tags: true,
  authorName: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Record<keyof PublicBlogPost, true>;

const allowedTags = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "em",
  "h2",
  "h3",
  "h4",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul",
]);

const removedBlockTags = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "link",
  "meta",
  "base",
  "svg",
  "math",
];

const blockTagPattern = new RegExp(
  `<(${removedBlockTags.join("|")})\\b[\\s\\S]*?<\\/\\1>`,
  "gi"
);
const singleTagPattern = new RegExp(
  `<\\/?(${removedBlockTags.join("|")})\\b[^>]*>`,
  "gi"
);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

export function isSafeUrl(value: string | null | undefined) {
  if (!value) return false;
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value.trim());
}

function buildAnchorAttributes(rawAttrs: string) {
  const hrefMatch = rawAttrs.match(/\shref\s*=\s*(["'])(.*?)\1/i);
  const titleMatch = rawAttrs.match(/\stitle\s*=\s*(["'])(.*?)\1/i);
  const href = hrefMatch?.[2]?.trim();
  if (!isSafeUrl(href)) return "";
  const safeHref = href as string;

  const attrs = [`href="${escapeAttribute(safeHref)}"`];
  if (titleMatch?.[2]) {
    attrs.push(`title="${escapeAttribute(titleMatch[2])}"`);
  }
  attrs.push('rel="noopener noreferrer"');
  if (/^https?:\/\//i.test(safeHref)) {
    attrs.push('target="_blank"');
  }

  return ` ${attrs.join(" ")}`;
}

export function sanitizeBlogHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";

  if (!/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed
      .split(/\n{2,}/)
      .map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\n/g, "<br />")}</p>`)
      .join("");
  }

  return trimmed
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(blockTagPattern, "")
    .replace(singleTagPattern, "")
    .replace(/<\/?([a-z0-9-]+)(\s[^>]*)?>/gi, (match, rawTag, rawAttrs = "") => {
      const tag = String(rawTag).toLowerCase();
      if (!allowedTags.has(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;
      if (tag === "a") return `<a${buildAnchorAttributes(rawAttrs)}>`;
      if (tag === "br" || tag === "hr") return `<${tag}>`;
      return `<${tag}>`;
    });
}

export function getPlainTextFromHtml(content: string) {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTimeMinutes(content: string) {
  const text = getPlainTextFromHtml(content);
  if (!text) return 1;
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export async function getPublishedBlogPosts(category?: string) {
  return prisma.blogPost.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: publicPostSelect,
  });
}

export async function getPublishedBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    select: publicPostSelect,
  });
}

export async function getBlogCategories() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return posts.map((post) => post.category).filter(Boolean);
}

export async function getRelatedBlogPosts(post: PublicBlogPost, take = 2) {
  return prisma.blogPost.findMany({
    where: {
      id: { not: post.id },
      isPublished: true,
      category: post.category,
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    select: publicPostSelect,
  });
}
