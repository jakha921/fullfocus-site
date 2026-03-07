import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("FullFocus2025", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fullfocus.dev" },
    update: {},
    create: {
      email: "admin@fullfocus.dev",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Created admin user:", admin.email);

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
      update: {},
      create: {
        id: "team-1",
        name: "Ахмад Рузибоев",
        position: "CEO & Founder",
        bio: "Более 10 лет опыта в IT-индустрии. Основатель FullFocus.",
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

  // Create blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "how-to-choose-it-contractor" },
      update: {},
      create: {
        title: "Как выбрать IT-подрядчика для вашего проекта",
        slug: "how-to-choose-it-contractor",
        excerpt:
          "Руководство по выбору надёжного партнёра для разработки программного обеспечения",
        content: `<p>Выбор правильного IT-подрядчика — критически важное решение. В этой статье мы разберём ключевые критерии.</p>
<h2>1. Определите свои потребности</h2>
<p>Прежде чем начать поиск подрядчика, чётко сформулируйте требования к проекту.</p>
<h2>2. Изучите портфолио</h2>
<p>Портфолио — лучший способ оценить компетенции команды.</p>
<h2>3. Проверьте отзывы</h2>
<p>Не стесняйтесь просить контакты предыдущих клиентов.</p>`,
        category: "Советы",
        tags: ["подрядчик", "разработка", "выбор"],
        authorName: "Ахмад Рузибоев",
        isPublished: true,
        publishedAt: new Date("2024-01-15"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "web-development-trends-2025" },
      update: {},
      create: {
        title: "Тренды веб-разработки в 2025 году",
        slug: "web-development-trends-2025",
        excerpt:
          "Обзор ключевых технологий и подходов, которые будут определять индустрию",
        content: `<p>Веб-разработка продолжает эволюционировать. Рассмотрим главные тренды 2025 года.</p>
<h2>Server Components</h2>
<p>React Server Components меняют подход к рендерингу приложений.</p>
<h2>AI-интеграции</h2>
<p>Искусственный интеллект становится неотъемлемой частью веб-приложений.</p>`,
        category: "Технологии",
        tags: ["React", "Next.js", "тренды"],
        authorName: "Бобур Каримов",
        isPublished: true,
        publishedAt: new Date("2024-02-01"),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "why-ux-design-matters" },
      update: {},
      create: {
        title: "Зачем вашему бизнесу нужен UX-дизайн",
        slug: "why-ux-design-matters",
        excerpt:
          "Как качественный дизайн интерфейсов влияет на конверсию и удержание пользователей",
        content: `<p>UX-дизайн — это не просто красивые картинки, а стратегия бизнеса.</p>
<h2>Влияние на конверсию</h2>
<p>Хороший UX может увеличить конверсию на 200-400%.</p>
<h2>Удержание пользователей</h2>
<p>Интуитивный интерфейс снижает churn rate.</p>`,
        category: "Дизайн",
        tags: ["UX", "дизайн", "конверсия"],
        authorName: "Нигора Назарова",
        isPublished: true,
        publishedAt: new Date("2024-02-15"),
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
    { key: "month_name", value: "апрель" },
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
