import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "@/components/ui";
import type { PublicBlogPost } from "@/lib/blog";
import { localizedPath, type Locale } from "@/lib/routing";

const dateLocales: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

function getSafeImageSrc(value: string | null | undefined) {
  const src = value?.trim();
  if (!src) return null;
  return /^(https?:\/\/|\/(?!\/))/i.test(src) ? src : null;
}

function getGradient(index: number) {
  const gradients = [
    "from-emerald-500/20 to-teal-500/10",
    "from-teal-500/20 to-blue-500/10",
    "from-blue-500/20 to-emerald-500/10",
  ];

  return gradients[index % gradients.length];
}

export async function BlogSection({
  locale,
  posts,
}: {
  locale: Locale;
  posts: PublicBlogPost[];
}) {
  if (posts.length === 0) return null;

  const t = await getTranslations("blog_page");
  const [featured, ...rest] = posts;
  const featuredImage = getSafeImageSrc(featured.coverImage);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured post - spans 2 cols */}
          <div className="md:col-span-2">
            <Link href={localizedPath(`/blog/${featured.slug}`, locale)}>
              <div className="glass-card rounded-2xl overflow-hidden group h-full min-h-[280px] relative flex flex-col justify-end hover:border-white/15 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(0)}`} />
                {featuredImage && (
                  <Image
                    src={featuredImage}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="absolute inset-0 object-cover opacity-60 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="glass-card rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="gradient">{featured.category}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {(featured.publishedAt ?? featured.createdAt).toLocaleDateString(dateLocales[locale], {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{featured.excerpt}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Smaller posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post, index) => {
              const coverImage = getSafeImageSrc(post.coverImage);
              return (
              <div
                key={post.slug}
                className="flex-1"
              >
                <Link href={localizedPath(`/blog/${post.slug}`, locale)}>
                  <div className="glass-card rounded-2xl overflow-hidden group h-full relative flex flex-col justify-end hover:border-white/15 transition-all duration-300 min-h-[120px]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index + 1)}`} />
                    {coverImage && (
                      <Image
                        src={coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="absolute inset-0 object-cover opacity-50 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-75"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="gradient" className="text-xs px-2 py-0.5">
                          {post.category}
                        </Badge>
                      </div>
                      <h3 className="font-display font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
              );
            })}
          </div>
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href={localizedPath("/blog", locale)}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {t("back_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
