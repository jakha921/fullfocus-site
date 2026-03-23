import Script from 'next/script';

interface OrganizationJsonLdProps {
  locale: string;
}

export function OrganizationJsonLd({ locale }: OrganizationJsonLdProps) {
  const description = locale === 'ru'
    ? "IT-компания: веб-разработка, мобильные приложения, ERP/CRM системы"
    : locale === 'uz'
    ? "IT kompaniya: veb-ishlab chiqish, mobil ilovalar, ERP/CRM tizimlar"
    : "IT Company: Web development, mobile apps, ERP/CRM systems";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FullFocus",
    "alternateName": "FullFocus.dev",
    "url": "https://fullfocus.dev",
    "logo": "https://fullfocus.dev/logo.png",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-90-123-45-67",
      "contactType": "sales",
      "availableLanguage": ["English", "Russian", "Uzbek"]
    },
    "sameAs": [
      "https://t.me/fullfocusdev",
      "https://instagram.com/fullfocus.dev",
      "https://linkedin.com/company/fullfocus-dev"
    ],
    "priceRange": "$5,000 - $50,000+"
  });

  return (
    <Script id="organization-jsonld" type="application/ld+json">
      {jsonLd}
    </Script>
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  locale: string;
}

export function ServiceJsonLd({ name, description, locale }: ServiceJsonLdProps) {
  const serviceType = locale === 'ru' ? "IT-услуги" : locale === 'uz' ? "IT xizmatlar" : "IT Services";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "FullFocus",
      "url": "https://fullfocus.dev"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "serviceType": serviceType
  });

  return (
    <Script id={`service-jsonld-${name.toLowerCase().replace(/\s/g, '-')}`} type="application/ld+json">
      {jsonLd}
    </Script>
  );
}

interface FAQJsonLdProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  return (
    <Script id="faq-jsonld" type="application/ld+json">
      {jsonLd}
    </Script>
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://fullfocus.dev${item.url}`
    }))
  });

  return (
    <Script id="breadcrumb-jsonld" type="application/ld+json">
      {jsonLd}
    </Script>
  );
}
