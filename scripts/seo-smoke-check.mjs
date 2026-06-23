const baseUrl = process.env.BASE_URL || "http://localhost:3010";

const requiredRoutes = [
  "/",
  "/ru",
  "/en",
  "/blog",
  "/ru/blog",
  "/en/blog",
  "/sitemap.xml",
  "/sitemap-pages.xml",
  "/sitemap-services.xml",
  "/sitemap-portfolio.xml",
  "/sitemap-blog.xml",
  "/sitemap-images.xml",
  "/robots.txt",
];

const requiredHomepageText = [
  "Avtomatlashtirish blogi",
  "FAQ",
  "AI-audit",
  "Birinchi natijalar 2-4 haftada",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function fetchText(path) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { redirect: "manual" });
  const text = await response.text();
  return { path, response, text };
}

async function assertRoute(path) {
  const { response } = await fetchText(path);
  assert(
    response.status === 200,
    `${path} expected 200, got ${response.status}`
  );
}

async function main() {
  for (const route of requiredRoutes) {
    await assertRoute(route);
  }

  const home = await fetchText("/");
  for (const text of requiredHomepageText) {
    assert(
      home.text.includes(text),
      `/ HTML should include SEO-critical text: ${text}`
    );
  }
  assert(
    home.text.includes("Organization") && home.text.includes("FAQPage"),
    "/ HTML should include Organization and FAQPage JSON-LD"
  );

  const ruHome = await fetchText("/ru");
  assert(
    /<html[^>]+lang="ru"/.test(ruHome.text),
    "/ru HTML should declare lang=\"ru\""
  );
  assert(
    ruHome.text.includes('href="https://fullfocus.dev/ru"'),
    "/ru HTML should include localized canonical"
  );

  const enHome = await fetchText("/en");
  assert(
    /<html[^>]+lang="en"/.test(enHome.text),
    "/en HTML should declare lang=\"en\""
  );
  assert(
    enHome.text.includes('href="https://fullfocus.dev/en"'),
    "/en HTML should include localized canonical"
  );

  const sitemap = await fetchText("/sitemap.xml");
  assert(
    sitemap.text.includes("<sitemapindex"),
    "/sitemap.xml should be a sitemap index"
  );
  for (const sitemapPath of [
    "sitemap-pages.xml",
    "sitemap-services.xml",
    "sitemap-portfolio.xml",
    "sitemap-blog.xml",
    "sitemap-images.xml",
  ]) {
    assert(
      sitemap.text.includes(`https://fullfocus.dev/${sitemapPath}`),
      `/sitemap.xml should reference ${sitemapPath}`
    );
  }

  const pages = await fetchText("/sitemap-pages.xml");
  assert(
    pages.text.includes('hreflang="ru-UZ"') &&
      pages.text.includes('hreflang="en-US"') &&
      pages.text.includes('hreflang="uz-UZ"') &&
      pages.text.includes('hreflang="x-default"'),
    "page sitemap should include hreflang alternates"
  );

  const images = await fetchText("/sitemap-images.xml");
  assert(
    images.text.includes("http://www.google.com/schemas/sitemap-image/1.1"),
    "image sitemap should include image namespace"
  );

  console.log(`SEO smoke check passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
