import type { Metadata } from "next";

const siteUrl = "https://fullfocus.dev";
const defaultImage = `${siteUrl}/images/hero-automation-dashboard.jpg`;

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function createPageMetadata({
  path,
  title,
  description,
  keywords = [],
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FullFocus",
      locale: "uz_UZ",
      type: "website",
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
