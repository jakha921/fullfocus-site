import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n";

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

type PublicBlogPostRecord = PublicBlogPost & {
  translations?: unknown;
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
  translations: true,
} satisfies Record<keyof PublicBlogPostRecord, true>;

const legacyPublicPostSelect = {
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

type JsonObject = Record<string, unknown>;

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function localizedObject(translations: unknown, locale: Locale): JsonObject {
  const all = asObject(translations);
  return asObject(all[locale]);
}

function localizedString(
  translations: unknown,
  locale: Locale,
  key: string,
  fallback: string | null | undefined
) {
  const value = localizedObject(translations, locale)[key];
  return typeof value === "string" && value.trim() ? value : fallback || "";
}

function localizedStringArray(
  translations: unknown,
  locale: Locale,
  key: string,
  fallback: string[]
) {
  const value = localizedObject(translations, locale)[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function optimizedPublicImage(image: string | null) {
  if (!image) return image;
  return image.startsWith("/images/") && /\.jpe?g$/i.test(image)
    ? image.replace(/\.jpe?g$/i, ".avif")
    : image;
}

function optimizePostImages(post: PublicBlogPost): PublicBlogPost {
  return {
    ...post,
    coverImage: optimizedPublicImage(post.coverImage),
  };
}

function isMissingTranslationsColumn(error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? (error as { code?: string }).code
      : undefined;
  return code === "P2022";
}

function localizePost(post: PublicBlogPostRecord, locale: Locale): PublicBlogPost {
  return {
    id: post.id,
    title: localizedString(post.translations, locale, "title", post.title),
    slug: post.slug,
    excerpt: localizedString(post.translations, locale, "excerpt", post.excerpt),
    content: localizedString(post.translations, locale, "content", post.content),
    coverImage: post.coverImage,
    category: localizedString(post.translations, locale, "category", post.category),
    tags: localizedStringArray(post.translations, locale, "tags", post.tags),
    authorName: post.authorName,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

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

export async function getPublishedBlogPosts(
  locale: Locale,
  category?: string,
  take?: number
) {
  let posts: PublicBlogPostRecord[];
  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: publicPostSelect,
    });
  } catch (error) {
    if (!isMissingTranslationsColumn(error)) throw error;
    const legacyPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: legacyPublicPostSelect,
    });
    posts = legacyPosts.map((post) => ({ ...post, translations: null }));
  }

  const localizedPosts = posts
    .map((post) => optimizePostImages(localizePost(post, locale)))
    .filter((post) => !category || post.category === category);

  return typeof take === "number" ? localizedPosts.slice(0, take) : localizedPosts;
}

export async function getPublishedBlogPostBySlug(slug: string, locale: Locale) {
  let post: PublicBlogPostRecord | null;
  try {
    post = await prisma.blogPost.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: publicPostSelect,
    });
  } catch (error) {
    if (!isMissingTranslationsColumn(error)) throw error;
    const legacyPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: legacyPublicPostSelect,
    });
    post = legacyPost ? { ...legacyPost, translations: null } : null;
  }

  return post ? optimizePostImages(localizePost(post, locale)) : null;
}

export async function getBlogCategories(locale: Locale) {
  const posts = await getPublishedBlogPosts(locale);

  return Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort();
}

export async function getRelatedBlogPosts(
  post: PublicBlogPost,
  locale: Locale,
  take = 2
) {
  const posts = await getPublishedBlogPosts(locale);

  return posts
    .filter((relatedPost) => relatedPost.id !== post.id && relatedPost.category === post.category)
    .slice(0, take);
}
