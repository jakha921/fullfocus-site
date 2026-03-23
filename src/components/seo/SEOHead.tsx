import { Metadata } from 'next';

interface SEOProps {
  locale: string;
  path?: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

const defaultContent = {
  en: {
    title: 'FullFocus - IT Solutions for Business Growth',
    description: 'Professional web development, mobile apps, UI/UX design, ERP/CRM systems. Transform your business with modern IT solutions.',
    keywords: ['IT company', 'web development', 'mobile apps', 'UI/UX design', 'ERP', 'CRM', 'software development', 'Uzbekistan'],
  },
  ru: {
    title: 'FullFocus - IT-решения для роста бизнеса',
    description: 'Профессиональная веб-разработка, мобильные приложения, UI/UX дизайн, ERP/CRM системы. Трансформируйте бизнес с современными IT-решениями.',
    keywords: ['IT компания', 'веб-разработка', 'мобильные приложения', 'UI/UX дизайн', 'ERP', 'CRM', 'разработка ПО', 'Узбекистан'],
  },
  uz: {
    title: "FullFocus - Biznes o'sishi uchun IT yechimlar",
    description: 'Professional veb-ishlab chiqish, mobil ilovalar, UI/UX dizayn, ERP/CRM tizimlar. Biznesingizni zamonaviy IT yechimlar bilan transformatsiya qiling.',
    keywords: ['IT kompaniya', 'veb-ishlab chiqish', 'mobil ilovalar', 'UI/UX dizayn', 'ERP', 'CRM', 'dasturlash', "O'zbekiston"],
  },
};

export function generateSEOMetadata({ locale, path = '', title, description, keywords }: SEOProps): Metadata {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en;

  return {
    title: title || content.title,
    description: description || content.description,
    keywords: keywords || content.keywords,
    authors: [{ name: 'FullFocus' }],
    creator: 'FullFocus',
    publisher: 'FullFocus',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'uz' ? 'uz_UZ' : 'en_US',
      url: `https://fullfocus.dev${path}`,
      siteName: 'FullFocus',
      title: title || content.title,
      description: description || content.description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'FullFocus - IT Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || content.title,
      description: description || content.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `https://fullfocus.dev${path}`,
      languages: {
        'en': `https://fullfocus.dev/en${path}`,
        'ru': `https://fullfocus.dev/ru${path}`,
        'uz': `https://fullfocus.dev/uz${path}`,
      },
    },
  };
}
