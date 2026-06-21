import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const legacyDemoPosts = [
  {
    slug: "how-to-choose-it-contractor",
    title: "Как выбрать IT-подрядчика для вашего проекта",
  },
  {
    slug: "web-development-trends-2025",
    title: "Тренды веб-разработки в 2025 году",
  },
  {
    slug: "why-ux-design-matters",
    title: "Зачем вашему бизнесу нужен UX-дизайн",
  },
];

const starterPosts = [
  {
    title: "Biznes jarayonlarini avtomatlashtirish: nimadan boshlash kerak",
    slug: "biznes-jarayonlarini-avtomatlashtirish",
    excerpt:
      "Qaysi jarayonlarni birinchi avtomatlashtirish kerakligini aniqlash uchun amaliy qo'llanma.",
    content: `<p>Biznes avtomatlashtirishni katta va xavfli loyiha sifatida boshlash shart emas. Eng yaxshi natija odatda takrorlanadigan, o'lchanadigan va mijoz yoki xodim vaqtini ko'p olayotgan jarayonlardan boshlanganda chiqadi.</p>
<h2>Avval qaysi muammoni tanlash kerak?</h2>
<p>Bir haftada eng ko'p takrorlanadigan ishlarni yozib chiqing: leadlarni qabul qilish, mijozlarga javob berish, CRM statuslarini yangilash, hisobot tayyorlash, to'lov eslatmalari yoki hujjat yaratish.</p>
<ul>
  <li>Jarayon har kuni takrorlanadimi?</li>
  <li>Xato yoki kechikish pul yo'qotishiga olib keladimi?</li>
  <li>Natijani raqam bilan o'lchash mumkinmi?</li>
</ul>
<h2>Tez ROI beradigan yo'nalishlar</h2>
<p>Odatda birinchi avtomatlashtirish uchun Telegram lead capture, CRM reminder, manager task flow, Google Sheets hisobotlari va AI support agent yaxshi nomzod bo'ladi.</p>
<h2>Texnik topshiriq uchun kerakli savollar</h2>
<p>Har bir jarayon uchun kirish ma'lumoti, qaror qoidalari, kim javobgar ekani, yakuniy status va kerakli hisobotlarni aniqlang. Shu ma'lumotlar aniq bo'lsa, MVP tezroq va arzonroq chiqadi.</p>`,
    category: "AI automation",
    tags: ["business automation", "AI audit", "process automation"],
    authorName: "FullFocus",
  },
  {
    title: "Telegram bot biznes uchun: lead, CRM va hisobotlarni avtomatlashtirish",
    slug: "telegram-bot-biznes-avtomatlashtirish",
    excerpt:
      "Telegram orqali keladigan murojaatlarni yo'qotmaslik va CRMga avtomatik tushirish yo'li.",
    content: `<p>O'zbekistonda ko'p biznes uchun asosiy aloqa kanali Telegram. Shuning uchun bot faqat savol-javob vositasi emas, balki lead capture, CRM, reminder va mini-hisobot tizimi bo'lishi mumkin.</p>
<h2>Telegram bot nimani avtomatlashtiradi?</h2>
<ul>
  <li>Mijozdan ism, telefon, xizmat turi va budjetni yig'adi.</li>
  <li>Leadni CRM yoki Google Sheetsga yozadi.</li>
  <li>Mas'ul managerga Telegram notification yuboradi.</li>
  <li>Mijozga keyingi qadam va statusni ko'rsatadi.</li>
</ul>
<h2>AI agent qayerda yordam beradi?</h2>
<p>AI agent tez-tez beriladigan savollarga javob beradi, mijoz muammosini aniqlaydi va murakkab holatlarda suhbatni managerga qisqa xulosa bilan uzatadi.</p>
<h2>Qaysi bizneslarga mos?</h2>
<p>O'quv markazlari, klinikalar, servis bizneslar, e-commerce, konsalting va B2B sotuvlarda Telegram bot tez natija beradi, chunki leadlar allaqachon chat orqali keladi.</p>`,
    category: "Telegram bots",
    tags: ["Telegram bot", "CRM automation", "lead automation"],
    authorName: "FullFocus",
  },
  {
    title: "CRM avtomatlashtirish: sotuv voronkasini nazorat qilish",
    slug: "crm-avtomatlashtirish-sotuv-voronkasi",
    excerpt:
      "Leadlar, manager vazifalari, follow-up va hisobotlar CRM ichida qanday avtomatlashtiriladi.",
    content: `<p>CRM faqat mijozlar ro'yxati bo'lib qolsa, u biznesga kam foyda beradi. CRM avtomatlashtirishning maqsadi - har bir lead uchun keyingi qadam, mas'ul xodim, muddat va natijani aniq qilish.</p>
<h2>CRMda birinchi avtomatlashtiriladigan joylar</h2>
<ul>
  <li>Sayt, Telegram va reklama formalaridan lead yaratish.</li>
  <li>Managerga avtomatik tayinlash va reminder berish.</li>
  <li>Javobsiz qolgan leadlar bo'yicha SLA alert yuborish.</li>
  <li>Haftalik sotuv hisobotlarini avtomatik tayyorlash.</li>
</ul>
<h2>Qanday natija kutish mumkin?</h2>
<p>To'g'ri sozlangan CRM manager intizomini oshiradi, yo'qolgan leadlar sonini kamaytiradi va egaga real vaqt rejimida sotuv voronkasini ko'rsatadi.</p>
<h2>Avval audit qiling</h2>
<p>CRMni almashtirishdan oldin mavjud jarayonni xaritalash kerak. Ba'zan yangi CRM shart emas - mavjud tizim atrofida integratsiya va automation layer qurish yetarli bo'ladi.</p>`,
    category: "CRM automation",
    tags: ["CRM automation", "sales funnel", "business process"],
    authorName: "FullFocus",
  },
];

async function main() {
  if (process.env.DISABLE_STARTER_SEO_POSTS === "true") {
    console.log("[seo-content] Starter SEO posts disabled");
    return;
  }

  const hiddenLegacy = await prisma.blogPost.updateMany({
    where: {
      OR: legacyDemoPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
      })),
    },
    data: {
      isPublished: false,
    },
  });

  let created = 0;
  for (const post of starterPosts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
      select: { id: true },
    });

    if (existing) continue;

    await prisma.blogPost.create({
      data: {
        ...post,
        isPublished: true,
        publishedAt: new Date("2026-06-21T00:00:00.000Z"),
      },
    });
    created += 1;
  }

  console.log(
    `[seo-content] Ready. Created ${created} starter posts; hidden ${hiddenLegacy.count} legacy demo posts`
  );
}

main()
  .catch((error) => {
    console.error("[seo-content] Failed to ensure starter SEO content:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
