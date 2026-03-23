import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fullfocus.dev';
  const locales = ['en', 'ru', 'uz'];
  const pages = ['', '/about', '/services', '/portfolio', '/contact'];

  const urls: MetadataRoute.Sitemap = [];

  // Generate URLs for all locales and pages
  locales.forEach(locale => {
    pages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    });
  });

  return urls;
}
