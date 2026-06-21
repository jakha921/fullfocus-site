import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user only when credentials are explicitly provided.
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME?.trim() || "Admin";

  if (adminEmail && adminPassword) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      throw new Error("ADMIN_EMAIL must be a valid email address");
    }
    if (adminPassword.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters long");
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        name: adminName,
        role: "admin",
      },
      create: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: "admin",
      },
    });
    console.log("Admin user ready:", admin.email);
  } else {
    console.log("Skipped admin user seed: set ADMIN_EMAIL and ADMIN_PASSWORD");
  }

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        title: "Веб-разработка",
        slug: "web-development",
        description:
          "Создаём современные веб-приложения и сайты с использованием передовых технологий. От лендингов до сложных корпоративных систем.",
        icon: "Code",
        features: [
          "React, Next.js, Vue.js",
          "Node.js, Express, NestJS",
          "PostgreSQL, MongoDB, Redis",
          "REST API, GraphQL",
          "SEO оптимизация",
          "Высокая производительность",
        ],
        order: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: {
        title: "Мобильные приложения",
        slug: "mobile-development",
        description:
          "Разрабатываем нативные и кроссплатформенные приложения для iOS и Android. От идеи до публикации в сторах.",
        icon: "Smartphone",
        features: [
          "React Native, Flutter",
          "Swift, Kotlin",
          "Push-уведомления",
          "Офлайн-режим",
          "Интеграция с API",
          "Публикация в сторах",
        ],
        order: 2,
      },
    }),
    prisma.service.upsert({
      where: { slug: "ui-ux-design" },
      update: {},
      create: {
        title: "UI/UX Дизайн",
        slug: "ui-ux-design",
        description:
          "Проектируем интуитивные и красивые интерфейсы, которые пользователи любят использовать.",
        icon: "Palette",
        features: [
          "Исследование пользователей",
          "Wireframes и прототипы",
          "Дизайн-системы",
          "Адаптивный дизайн",
          "UI-киты",
          "Тестирование юзабилити",
        ],
        order: 3,
      },
    }),
    prisma.service.upsert({
      where: { slug: "erp-crm-systems" },
      update: {},
      create: {
        title: "ERP/CRM системы",
        slug: "erp-crm-systems",
        description:
          "Внедряем и настраиваем системы для автоматизации бизнес-процессов вашего предприятия.",
        icon: "Database",
        features: [
          "1С:Предприятие",
          "Odoo, ERPNext",
          "Salesforce, HubSpot",
          "Интеграция с сервисами",
          "Миграция данных",
          "Техническая поддержка",
        ],
        order: 4,
      },
    }),
  ]);
  console.log(`Created ${services.length} services`);

  // Create projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: "ecommerce-platform" },
      update: {},
      create: {
        title: "E-commerce Platform",
        slug: "ecommerce-platform",
        description:
          "Современная платформа для онлайн-торговли с интеграцией платёжных систем. Платформа обрабатывает тысячи заказов ежедневно и поддерживает мультиязычность.",
        shortDesc: "Современная платформа для онлайн-торговли с интеграцией платёжных систем",
        category: "web",
        client: "Retail Co.",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
        images: ["/images/project-1.jpg"],
        coverImage: "/images/project-1.jpg",
        link: "https://example.com",
        featured: true,
        order: 1,
      },
    }),
    prisma.project.upsert({
      where: { slug: "mobile-banking-app" },
      update: {},
      create: {
        title: "Mobile Banking App",
        slug: "mobile-banking-app",
        description:
          "Мобильное приложение для управления финансами с биометрической аутентификацией и real-time уведомлениями.",
        shortDesc: "Мобильное приложение для управления финансами с биометрической аутентификацией",
        category: "mobile",
        client: "FinTech Solutions",
        technologies: ["Flutter", "Firebase", "Stripe", "Fingerprint"],
        images: ["/images/project-2.jpg"],
        coverImage: "/images/project-2.jpg",
        link: "https://example.com",
        featured: true,
        order: 2,
      },
    }),
    prisma.project.upsert({
      where: { slug: "crm-system" },
      update: {},
      create: {
        title: "CRM System",
        slug: "crm-system",
        description:
          "Система управления взаимоотношениями с клиентами для B2B продаж с автоматизацией воронки продаж.",
        shortDesc: "Система управления взаимоотношениями с клиентами для B2B продаж",
        category: "erp",
        client: "B2B Corp",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"],
        images: ["/images/project-3.jpg"],
        coverImage: "/images/project-3.jpg",
        link: "https://example.com",
        featured: true,
        order: 3,
      },
    }),
    prisma.project.upsert({
      where: { slug: "food-delivery-app" },
      update: {},
      create: {
        title: "Food Delivery App",
        slug: "food-delivery-app",
        description:
          "Приложение для доставки еды с tracking системой и интеграцией с платёжными шлюзами.",
        shortDesc: "Приложение для доставки еды с tracking системой",
        category: "mobile",
        client: "FoodTech",
        technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
        images: ["/images/project-5.jpg"],
        coverImage: "/images/project-5.jpg",
        link: "https://example.com",
        featured: false,
        order: 4,
      },
    }),
  ]);
  console.log(`Created ${projects.length} projects`);

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.upsert({
      where: { id: "team-1" },
      update: {
        name: "Jakhongir Ruzibaev",
      },
      create: {
        id: "team-1",
        name: "Jakhongir Ruzibaev",
        position: "CEO & Founder",
        bio: "5+ лет опыта в IT-индустрии. Основатель FullFocus.",
        photo: null,
        linkedin: "https://linkedin.com/in/example",
        github: "https://github.com/example",
        telegram: "https://t.me/example",
        order: 1,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: "team-2" },
      update: {},
      create: {
        id: "team-2",
        name: "Бобур Каримов",
        position: "CTO",
        bio: "Архитектор решений, эксперт в cloud технологиях.",
        photo: null,
        linkedin: "https://linkedin.com/in/example",
        github: "https://github.com/example",
        telegram: "https://t.me/example",
        order: 2,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: "team-3" },
      update: {},
      create: {
        id: "team-3",
        name: "Нигора Назарова",
        position: "Lead Designer",
        bio: "UI/UX специалист с международным опытом.",
        photo: null,
        linkedin: "https://linkedin.com/in/example",
        order: 3,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: "team-4" },
      update: {},
      create: {
        id: "team-4",
        name: "Жасур Алимов",
        position: "Full-Stack Developer",
        bio: "Expert в React, Node.js и облачных решениях.",
        photo: null,
        github: "https://github.com/example",
        telegram: "https://t.me/example",
        order: 4,
      },
    }),
  ]);
  console.log(`Created ${teamMembers.length} team members`);

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: "testimonial-1" },
      update: {},
      create: {
        id: "testimonial-1",
        clientName: "Алексей Петров",
        company: "TechStart",
        position: "CEO",
        content:
          "Команда FullFocus превзошла все наши ожидания. Они создали для нас современную e-commerce платформу, которая увеличила наши продажи на 150%.",
        rating: 5,
        order: 1,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-2" },
      update: {},
      create: {
        id: "testimonial-2",
        clientName: "Мария Иванова",
        company: "FinTech Solutions",
        position: "CTO",
        content:
          "Профессиональный подход к разработке мобильного приложения. Качество кода и внимание к деталям на высшем уровне.",
        rating: 5,
        order: 2,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-3" },
      update: {},
      create: {
        id: "testimonial-3",
        clientName: "Дмитрий Козлов",
        company: "Retail Group",
        position: "Директор по IT",
        content:
          "Внедрение CRM-системы прошло гладко и в срок. Техническая поддержка работает оперативно и эффективно.",
        rating: 5,
        order: 3,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-4" },
      update: {},
      create: {
        id: "testimonial-4",
        clientName: "Елена Смирнова",
        company: "FoodTech",
        position: "Product Manager",
        content:
          "Отличная команда! Разработали для нас приложение доставки еды в кратчайшие сроки без потери качества.",
        rating: 5,
        order: 4,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: "testimonial-5" },
      update: {},
      create: {
        id: "testimonial-5",
        clientName: "Игорь Волков",
        company: "MediaCorp",
        position: "Founder",
        content:
          "Рекомендую FullFocus всем, кто ищет надёжного IT-партнёра. Профессионализм на каждом этапе работы.",
        rating: 5,
        order: 5,
      },
    }),
  ]);
  console.log(`Created ${testimonials.length} testimonials`);

  // Hide legacy demo posts that no longer match the automation positioning.
  await prisma.blogPost.updateMany({
    where: {
      slug: {
        in: [
          "how-to-choose-it-contractor",
          "web-development-trends-2025",
          "why-ux-design-matters",
        ],
      },
    },
    data: {
      isPublished: false,
    },
  });

  // Create starter SEO articles. Existing posts are not overwritten so admins can edit them.
  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "biznes-jarayonlarini-avtomatlashtirish" },
      update: {},
      create: {
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
        coverImage: "/images/blog-automation-audit.jpg",
        isPublished: true,
        publishedAt: new Date("2026-06-21"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "telegram-bot-biznes-avtomatlashtirish" },
      update: {},
      create: {
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
        coverImage: "/images/blog-telegram-bot.jpg",
        isPublished: true,
        publishedAt: new Date("2026-06-21"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "crm-avtomatlashtirish-sotuv-voronkasi" },
      update: {},
      create: {
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
        coverImage: "/images/blog-crm-automation.jpg",
        isPublished: true,
        publishedAt: new Date("2026-06-21"),
      },
    }),
  ]);
  console.log(`Created ${blogPosts.length} blog posts`);

  // Create settings
  const settings = [
    { key: "companyName", value: "FullFocus" },
    { key: "companyDescription", value: "Создаём современные IT-продукты" },
    { key: "phone", value: "+998 90 123 45 67" },
    { key: "email", value: "hello@fullfocus.dev" },
    { key: "address", value: "Ташкент, Узбекистан" },
    { key: "telegram", value: "https://t.me/fullfocus" },
    { key: "github", value: "https://github.com/fullfocus" },
    { key: "metaTitle", value: "FullFocus — IT Solutions" },
    { key: "metaDescription", value: "Создаём современные IT-продукты, которые помогают бизнесу расти" },
    { key: "telegram_bot_token", value: "" },
    { key: "telegram_chat_id", value: "" },
    { key: "sticky_bar_enabled", value: "false" },
    { key: "available_slots", value: "3" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`Created ${settings.length} settings`);

  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
