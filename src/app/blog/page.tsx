/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  searchParams?: {
    category?: string;
  };
};

function formatDate(date: Date | null) {
  return (date ?? new Date()).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function categoryHref(category?: string) {
  return category ? `/blog?category=${encodeURIComponent(category)}` : "/blog";
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
  const activeCategory = searchParams?.category?.trim();
  const [categories, posts] = await Promise.all([
    getBlogCategories(),
    getPublishedBlogPosts(activeCategory),
  ]);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-32 noise-bg sm:px-6 lg:px-8">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full ambient-glow-green blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
            AI automation blog
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Biznes avtomatlashtirish bo&apos;yicha{" "}
            <span className="gradient-text">amaliy maqolalar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            CRM, Telegram bot, AI agentlar, lead management va biznes jarayonlarini
            tizimlashtirish haqida SEO maqolalar.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              !activeCategory
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
          >
            Barchasi
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={categoryHref(category)}
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
                <Link href={`/blog/${featured.slug}`}>
                  <article className="glass-card group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-lg transition-all duration-300 hover:border-white/15">
                    {featured.coverImage ? (
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
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
                          {formatDate(featured.publishedAt ?? featured.createdAt)}
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
                {rest.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="glass-card group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-lg transition-all duration-300 hover:border-white/15">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
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
                            {formatDate(post.publishedAt ?? post.createdAt)}
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
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white">
                Maqolalar tayyorlanmoqda
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Hozircha bu kategoriya bo&apos;yicha chop etilgan maqola yo&apos;q. Shu vaqt ichida
                biznesingizdagi avtomatlashtirish imkoniyatlarini auditdan o&apos;tkazing.
              </p>
              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
              >
                AI auditdan o&apos;tish
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
