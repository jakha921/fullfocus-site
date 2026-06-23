import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routing";

export const revalidate = 300;

type BlogPageProps = {
  searchParams?: {
    category?: string;
  };
};

const dateLocales: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

function formatDate(date: Date | null, locale: Locale) {
  return (date ?? new Date()).toLocaleDateString(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function categoryHref(category: string | undefined, locale: Locale) {
  const basePath = localizedPath("/blog", locale);
  return category ? `${basePath}?category=${encodeURIComponent(category)}` : basePath;
}

function getSafeImageSrc(value: string | null | undefined) {
  const src = value?.trim();
  if (!src) return null;
  return /^(https?:\/\/|\/(?!\/))/i.test(src) ? src : null;
}

function getCardGradient(index: number) {
  const gradients = [
    "from-emerald-500/20 to-teal-500/10",
    "from-teal-500/20 to-blue-500/10",
    "from-blue-500/20 to-emerald-500/10",
    "from-purple-500/20 to-teal-500/10",
  ];

  return gradients[index % gradients.length];
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale = (await getLocale()) as Locale;
  const activeCategory = searchParams?.category?.trim();
  const t = await getTranslations("blog_page");
  const [categories, posts] = await Promise.all([
    getBlogCategories(locale),
    getPublishedBlogPosts(locale, activeCategory),
  ]);

  const featured = posts[0];
  const rest = posts.slice(1);
  const featuredCoverImage = getSafeImageSrc(featured?.coverImage);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-32 noise-bg sm:px-6 lg:px-8">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full ambient-glow-green blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
            {t("badge")}
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t("title")} <span className="gradient-text">{t("highlight")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3">
          <Link
            href={categoryHref(undefined, locale)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              !activeCategory
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
          >
            {t("all")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={categoryHref(category, locale)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {featured ? (
            <>
              <div className="mb-6">
                <Link href={localizedPath(`/blog/${featured.slug}`, locale)}>
                  <article className="glass-card group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-lg transition-all duration-300 hover:border-white/15">
                    {featuredCoverImage ? (
                      <Image
                        src={featuredCoverImage}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 1024px) 896px, 100vw"
                        priority
                        className="absolute inset-0 h-full w-full object-cover opacity-55"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(0)}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>

                    <div className="relative z-10 max-w-3xl p-6 md:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                          {featured.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-zinc-400">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featured.publishedAt ?? featured.createdAt, locale)}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-emerald-300 md:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 text-base leading-7 text-zinc-300">
                        {featured.excerpt}
                      </p>
                      <p className="mt-4 text-sm text-zinc-500">{featured.authorName}</p>
                    </div>
                  </article>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, index) => {
                  const coverImage = getSafeImageSrc(post.coverImage);
                  return (
                    <Link key={post.id} href={localizedPath(`/blog/${post.slug}`, locale)}>
                      <article className="glass-card group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-lg transition-all duration-300 hover:border-white/15">
                        {coverImage ? (
                          <Image
                            src={coverImage}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="absolute inset-0 h-full w-full object-cover opacity-45"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(
                              index + 1
                            )}`}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        <div className="relative z-10 p-5">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt ?? post.createdAt, locale)}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-emerald-300">
                            {post.title}
                          </h3>
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                            {post.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white">
                {t("empty_title")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {t("empty_desc")}
              </p>
              <Link
                href={localizedPath("/quiz", locale)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
              >
                {t("audit_cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
