import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, Calendar, Clock3, User } from "lucide-react";
import { ArticleCta } from "@/components/blog/ArticleCta";
import {
  getPlainTextFromHtml,
  getPublishedBlogPostBySlug,
  getReadingTimeMinutes,
  getRelatedBlogPosts,
  sanitizeBlogHtml,
} from "@/lib/blog";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

function formatDate(date: Date | null) {
  return (date ?? new Date()).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getArticleUrl(slug: string) {
  return `https://fullfocus.dev/blog/${slug}`;
}

function getSafeImageSrc(value: string | null | undefined) {
  const src = value?.trim();
  if (!src) return null;
  return /^(https?:\/\/|\/(?!\/))/i.test(src) ? src : null;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPublishedBlogPostBySlug(params.slug);
  if (!post) return {};

  const url = getArticleUrl(post.slug);
  const image = getSafeImageSrc(post.coverImage) || undefined;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "FullFocus",
      locale: "uz_UZ",
      type: "article",
      publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.authorName],
      tags: post.tags,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPublishedBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedBlogPosts(post);
  const articleUrl = getArticleUrl(post.slug);
  const publishedAt = post.publishedAt ?? post.createdAt;
  const sanitizedContent = sanitizeBlogHtml(post.content);
  const readingTime = getReadingTimeMinutes(post.content);
  const articleBody = getPlainTextFromHtml(post.content);
  const safeCoverImage = getSafeImageSrc(post.coverImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        articleBody,
        url: articleUrl,
        datePublished: publishedAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        inLanguage: "uz-UZ",
        keywords: post.tags.join(", "),
        image: safeCoverImage ? [safeCoverImage] : undefined,
        author: {
          "@type": "Person",
          name: post.authorName,
        },
        publisher: {
          "@type": "Organization",
          name: "FullFocus",
          url: "https://fullfocus.dev",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fullfocus.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://fullfocus.dev/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id={`blog-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-4 pb-8 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Barcha maqolalar
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-zinc-500">
              <Calendar className="h-4 w-4" />
              {formatDate(publishedAt)}
            </span>
            <span className="flex items-center gap-1 text-sm text-zinc-500">
              <Clock3 className="h-4 w-4" />
              {readingTime} min o&apos;qish
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-zinc-400">
            <User className="h-4 w-4" />
            <span>{post.authorName}</span>
          </div>
        </div>
      </section>

      {safeCoverImage ? (
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg border border-white/10">
            <Image
              src={safeCoverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      ) : (
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto aspect-video max-w-4xl rounded-lg border border-white/10 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-zinc-900" />
        </section>
      )}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <article
            className="max-w-none text-zinc-300 [&_a]:text-teal-300 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-teal-300/60 [&_blockquote]:pl-5 [&_blockquote]:text-zinc-300 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_p]:leading-8 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-4 [&_strong]:text-white [&_table]:my-8 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-lg [&_td]:border [&_td]:border-white/10 [&_td]:p-3 [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/5 [&_th]:p-3 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          <ArticleCta />

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-8">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="rounded-lg bg-white/[0.04] px-3 py-1 text-sm text-zinc-400 transition hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-[#0f0f0f] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-white">
              Shu mavzuga yaqin maqolalar
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <article className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:bg-white/[0.06]">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {formatDate(relatedPost.publishedAt ?? relatedPost.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                      {relatedPost.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
