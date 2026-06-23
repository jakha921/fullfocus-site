import type { Metadata } from "next";
import {
  absoluteLocalizedUrl,
  localizedAlternates,
  openGraphLocales,
  siteUrl,
  type Locale,
} from "@/lib/routing";

const defaultImage = `${siteUrl}/images/hero-automation-dashboard.avif`;

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  locale?: Locale;
  type?: "website" | "article";
};

export function createPageMetadata({
  path,
  title,
  description,
  keywords = [],
  locale = "uz",
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = absoluteLocalizedUrl(canonicalPath, locale);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: localizedAlternates(canonicalPath),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FullFocus",
      locale: openGraphLocales[locale],
      type,
      images: [
        {
          url: defaultImage,
          width: 1672,
          height: 941,
          alt: "FullFocus AI automation dashboard",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
  };
}
