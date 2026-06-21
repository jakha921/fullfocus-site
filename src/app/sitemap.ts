import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fullfocus.dev';
  const lastModified = new Date('2026-06-21T00:00:00.000Z');
  const pages = [
    { path: '', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/quiz', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/portfolio', priority: 0.7 },
    { path: '/about', priority: 0.7 },
    { path: '/blog', priority: 0.6 },
    { path: '/privacy', priority: 0.2 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}
