interface OrganizationJsonLdProps {
  locale: string;
}

export function OrganizationJsonLd({ locale }: OrganizationJsonLdProps) {
  const description = locale === 'ru'
    ? "AI-автоматизация бизнеса: AI-агенты, Telegram/CRM workflows и SaaS-инструменты"
    : locale === 'uz'
    ? "Biznes uchun AI avtomatlashtirish: AI agentlar, Telegram/CRM workflow va SaaS vositalar"
    : "AI business automation: AI agents, Telegram/CRM workflows, and SaaS tools";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FullFocus",
    "alternateName": "FullFocus.dev",
    "url": "https://fullfocus.dev",
    "logo": "https://fullfocus.dev/images/fullfocus-logo.svg",
    "image": "https://fullfocus.dev/images/hero-automation-dashboard.avif",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
      "addressLocality": "Tashkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "availableLanguage": ["English", "Russian", "Uzbek"]
    },
    // @id совпадает с Person-разметкой на ruzibaev.uz — так Google склеивает обе в одну сущность
    "founder": {
      "@type": "Person",
      "@id": "https://ruzibaev.uz/#person",
      "name": "Jakhongir Ruzibaev",
      "jobTitle": "Software Engineer",
      "url": "https://ruzibaev.uz/"
    },
    "sameAs": [
      "https://t.me/fullfocusdev",
      "https://instagram.com/fullfocus.dev",
      "https://linkedin.com/company/fullfocus-dev"
    ]
  });

  return (
    <script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
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
    <script
      id={`service-jsonld-${name.toLowerCase().replace(/\s/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
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
    <script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
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
    <script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
