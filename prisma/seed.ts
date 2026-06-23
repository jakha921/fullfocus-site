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

  // Create automation-focused services. Existing records are updated so the
  // default CMS state stays aligned with the current positioning.
  const serviceSeeds = [
    {
      title: "AI-агенты и чат-боты",
      slug: "ai-agents-chatbots",
      description:
        "Запускаем AI-агентов для сайта, Telegram и внутренних команд: быстрые ответы, квалификация лидов, передача менеджеру и обновление CRM.",
      icon: "Bot",
      features: [
        "Ответы клиентам 24/7",
        "Квалификация лидов до менеджера",
        "Интеграция с Telegram и CRM",
        "База знаний и guardrails",
        "История диалогов и аналитика",
        "Передача сложных кейсов человеку",
      ],
      translations: {
        ru: {
          title: "AI-агенты и чат-боты",
          description:
            "Запускаем AI-агентов для сайта, Telegram и внутренних команд: быстрые ответы, квалификация лидов, передача менеджеру и обновление CRM.",
          features: [
            "Ответы клиентам 24/7",
            "Квалификация лидов до менеджера",
            "Интеграция с Telegram и CRM",
            "База знаний и guardrails",
            "История диалогов и аналитика",
            "Передача сложных кейсов человеку",
          ],
        },
        en: {
          title: "AI agents and chatbots",
          description:
            "We launch AI agents for websites, Telegram, and internal teams: fast answers, lead qualification, human handoff, and CRM updates.",
          features: [
            "24/7 customer replies",
            "Lead qualification before sales",
            "Telegram and CRM integration",
            "Knowledge base and guardrails",
            "Conversation history and analytics",
            "Human handoff for complex cases",
          ],
        },
        uz: {
          title: "AI agentlar va chatbotlar",
          description:
            "Sayt, Telegram va ichki jamoalar uchun AI agentlarni ishga tushiramiz: tez javob, lead saralash, managerga uzatish va CRM yangilash.",
          features: [
            "Mijozlarga 24/7 javob",
            "Leadlarni managergacha saralash",
            "Telegram va CRM integratsiyasi",
            "Bilim bazasi va xavfsiz qoidalar",
            "Dialog tarixi va analitika",
            "Murakkab holatlarni insonga uzatish",
          ],
        },
      },
      order: 1,
      isActive: true,
    },
    {
      title: "Автоматизация Telegram и CRM",
      slug: "telegram-crm-automation",
      description:
        "Связываем формы, Telegram, WhatsApp, CRM и таблицы в один поток, чтобы заявки не терялись, а менеджеры получали следующий шаг автоматически.",
      icon: "Workflow",
      features: [
        "Lead capture из сайта и мессенджеров",
        "Автоматическое создание CRM-сделок",
        "Назначение менеджеров и SLA-напоминания",
        "Дедупликация и статусы заявок",
        "Еженедельные отчеты без ручного сбора",
        "Уведомления в Telegram",
      ],
      translations: {
        ru: {
          title: "Автоматизация Telegram и CRM",
          description:
            "Связываем формы, Telegram, WhatsApp, CRM и таблицы в один поток, чтобы заявки не терялись, а менеджеры получали следующий шаг автоматически.",
          features: [
            "Lead capture из сайта и мессенджеров",
            "Автоматическое создание CRM-сделок",
            "Назначение менеджеров и SLA-напоминания",
            "Дедупликация и статусы заявок",
            "Еженедельные отчеты без ручного сбора",
            "Уведомления в Telegram",
          ],
        },
        en: {
          title: "Telegram and CRM automation",
          description:
            "We connect forms, Telegram, WhatsApp, CRM, and spreadsheets into one flow so leads are not missed and managers get the next action automatically.",
          features: [
            "Lead capture from site and messengers",
            "Automatic CRM deal creation",
            "Manager assignment and SLA reminders",
            "Lead deduplication and statuses",
            "Weekly reports without manual work",
            "Telegram notifications",
          ],
        },
        uz: {
          title: "Telegram va CRM avtomatlashtirish",
          description:
            "Forma, Telegram, WhatsApp, CRM va jadvallarni bitta oqimga ulaymiz: arizalar yo'qolmaydi, managerlar keyingi qadamni avtomatik oladi.",
          features: [
            "Sayt va messenjerdan lead yig'ish",
            "CRM bitimini avtomatik yaratish",
            "Manager tayinlash va SLA eslatmalar",
            "Leadlarni takrorlanishdan tozalash",
            "Qo'lda yig'ilmaydigan haftalik hisobot",
            "Telegram xabarnomalari",
          ],
        },
      },
      order: 2,
      isActive: true,
    },
    {
      title: "SaaS и внутренние порталы",
      slug: "saas-internal-portals",
      description:
        "Проектируем и разрабатываем SaaS/MVP, личные кабинеты и внутренние порталы, где AI и автоматизация встроены в рабочий процесс с первого релиза.",
      icon: "Code2",
      features: [
        "MVP за 6-8 недель",
        "Личные кабинеты и роли",
        "Админ-панель для команды",
        "AI-функции в продукте",
        "Платежи, аналитика и интеграции",
        "Архитектура под рост нагрузки",
      ],
      translations: {
        ru: {
          title: "SaaS и внутренние порталы",
          description:
            "Проектируем и разрабатываем SaaS/MVP, личные кабинеты и внутренние порталы, где AI и автоматизация встроены в рабочий процесс с первого релиза.",
          features: [
            "MVP за 6-8 недель",
            "Личные кабинеты и роли",
            "Админ-панель для команды",
            "AI-функции в продукте",
            "Платежи, аналитика и интеграции",
            "Архитектура под рост нагрузки",
          ],
        },
        en: {
          title: "SaaS and internal portals",
          description:
            "We design and build SaaS MVPs, client portals, and internal tools where AI and automation are part of the workflow from the first release.",
          features: [
            "MVP in 6-8 weeks",
            "Accounts, roles, and permissions",
            "Admin panel for your team",
            "AI features inside the product",
            "Payments, analytics, and integrations",
            "Architecture ready for growth",
          ],
        },
        uz: {
          title: "SaaS va ichki portallar",
          description:
            "SaaS MVP, shaxsiy kabinet va ichki portallarni yaratamiz: AI va avtomatlashtirish birinchi relizdan ish jarayoniga qo'shiladi.",
          features: [
            "6-8 haftada MVP",
            "Kabinetlar, rollar va huquqlar",
            "Jamoa uchun admin panel",
            "Mahsulot ichidagi AI funksiyalar",
            "To'lov, analitika va integratsiyalar",
            "O'sishga tayyor arxitektura",
          ],
        },
      },
      order: 3,
      isActive: true,
    },
    {
      title: "Интеграции и операционная аналитика",
      slug: "integrations-analytics",
      description:
        "Собираем разрозненные сервисы в управляемую систему: API-интеграции, дашборды, уведомления, документы и прозрачные метрики ROI.",
      icon: "Plug",
      features: [
        "Интеграции CRM, ERP, платежей и таблиц",
        "Операционные дашборды",
        "Автоматическая генерация документов",
        "Контроль SLA и узких мест",
        "Логи, алерты и мониторинг",
        "ROI-метрики после запуска",
      ],
      translations: {
        ru: {
          title: "Интеграции и операционная аналитика",
          description:
            "Собираем разрозненные сервисы в управляемую систему: API-интеграции, дашборды, уведомления, документы и прозрачные метрики ROI.",
          features: [
            "Интеграции CRM, ERP, платежей и таблиц",
            "Операционные дашборды",
            "Автоматическая генерация документов",
            "Контроль SLA и узких мест",
            "Логи, алерты и мониторинг",
            "ROI-метрики после запуска",
          ],
        },
        en: {
          title: "Integrations and operational analytics",
          description:
            "We turn disconnected tools into a managed system: API integrations, dashboards, notifications, documents, and clear ROI metrics.",
          features: [
            "CRM, ERP, payment, and spreadsheet integrations",
            "Operational dashboards",
            "Automatic document generation",
            "SLA and bottleneck tracking",
            "Logs, alerts, and monitoring",
            "Post-launch ROI metrics",
          ],
        },
        uz: {
          title: "Integratsiyalar va operatsion analitika",
          description:
            "Tarqoq servislarni boshqariladigan tizimga aylantiramiz: API integratsiya, dashboard, xabarnoma, hujjat va aniq ROI metrikalar.",
          features: [
            "CRM, ERP, to'lov va jadval integratsiyalari",
            "Operatsion dashboardlar",
            "Hujjatlarni avtomatik yaratish",
            "SLA va tor joylarni nazorat qilish",
            "Log, alert va monitoring",
            "Ishga tushgandan keyingi ROI metrikalar",
          ],
        },
      },
      order: 4,
      isActive: true,
    },
  ];

  const services = await Promise.all(
    serviceSeeds.map((service) =>
      prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      })
    )
  );
  console.log(`Created ${services.length} services`);

  // Create automation case studies
  const projectSeeds = [
    {
      title: "AI lead intake + CRM automation",
      slug: "ai-lead-intake-crm-automation",
      description:
        "<h2>Задача</h2><p>Заявки приходили из сайта и Telegram, менеджеры вручную копировали данные в CRM, а часть лидов терялась вечером и в выходные.</p><h2>Решение</h2><p>Мы собрали единый intake-flow: AI-агент уточняет потребность, создает сделку в CRM, назначает менеджера и отправляет SLA-напоминания.</p><h2>Результат</h2><p>Первый ответ стал занимать минуты, воронка стала прозрачной, а руководитель видит источники, статусы и узкие места без ручных отчетов.</p>",
      shortDesc: "AI-агент квалифицирует заявки и автоматически ведет их в CRM",
      category: "ai",
      client: "Education services",
      technologies: ["OpenAI", "Next.js", "Prisma", "PostgreSQL", "Telegram"],
      images: ["/images/project-1.avif"],
      coverImage: "/images/project-1.avif",
      link: "",
      translations: {
        ru: {
          title: "AI lead intake + CRM automation",
          shortDesc: "AI-агент квалифицирует заявки и автоматически ведет их в CRM",
          description:
            "<h2>Задача</h2><p>Заявки приходили из сайта и Telegram, менеджеры вручную копировали данные в CRM, а часть лидов терялась вечером и в выходные.</p><h2>Решение</h2><p>Мы собрали единый intake-flow: AI-агент уточняет потребность, создает сделку в CRM, назначает менеджера и отправляет SLA-напоминания.</p><h2>Результат</h2><p>Первый ответ стал занимать минуты, воронка стала прозрачной, а руководитель видит источники, статусы и узкие места без ручных отчетов.</p>",
          category: "AI automation",
        },
        en: {
          title: "AI lead intake + CRM automation",
          shortDesc: "An AI agent qualifies leads and routes them into CRM automatically",
          description:
            "<h2>Challenge</h2><p>Leads arrived from the website and Telegram, managers copied data into CRM manually, and after-hours requests were often missed.</p><h2>Solution</h2><p>We built one intake flow: the AI agent qualifies the request, creates a CRM deal, assigns a manager, and sends SLA reminders.</p><h2>Impact</h2><p>First response moved to minutes, the pipeline became visible, and management sees sources, statuses, and bottlenecks without manual reports.</p>",
          category: "AI automation",
        },
        uz: {
          title: "AI lead intake va CRM avtomatlashtirish",
          shortDesc: "AI agent arizalarni saralaydi va CRMga avtomatik yuboradi",
          description:
            "<h2>Muammo</h2><p>Arizalar sayt va Telegramdan kelardi, managerlar ma'lumotni CRMga qo'lda kiritardi, kechki payt va dam olish kunlari leadlar yo'qolardi.</p><h2>Yechim</h2><p>Bitta intake-flow qurdik: AI agent ehtiyojni aniqlaydi, CRM bitimini yaratadi, manager tayinlaydi va SLA eslatmalar yuboradi.</p><h2>Natija</h2><p>Birinchi javob daqiqalarga tushdi, voronka shaffof bo'ldi, rahbar manba, status va tor joylarni qo'lda hisobotlarsiz ko'radi.</p>",
          category: "AI avtomatlashtirish",
        },
      },
      featured: true,
      isActive: true,
      order: 1,
    },
    {
      title: "Telegram bot for sales operations",
      slug: "telegram-sales-operations-bot",
      description:
        "<h2>Задача</h2><p>Команда принимала заявки в Telegram-группах, но не было единого статуса, ответственного менеджера и отчета по конверсии.</p><h2>Решение</h2><p>Бот собирает контакты, тип услуги и бюджет, создает карточку, уведомляет менеджера и напоминает о следующем шаге.</p><h2>Результат</h2><p>Заявки перестали теряться в чатах, а владелец видит количество новых, активных и закрытых обращений.</p>",
      shortDesc: "Telegram-бот превращает чаты в управляемую воронку продаж",
      category: "automation",
      client: "Local services",
      technologies: ["Telegram", "n8n", "Supabase", "Google Sheets"],
      images: ["/images/project-2.avif"],
      coverImage: "/images/project-2.avif",
      link: "",
      translations: {
        ru: {
          title: "Telegram bot for sales operations",
          shortDesc: "Telegram-бот превращает чаты в управляемую воронку продаж",
          description:
            "<h2>Задача</h2><p>Команда принимала заявки в Telegram-группах, но не было единого статуса, ответственного менеджера и отчета по конверсии.</p><h2>Решение</h2><p>Бот собирает контакты, тип услуги и бюджет, создает карточку, уведомляет менеджера и напоминает о следующем шаге.</p><h2>Результат</h2><p>Заявки перестали теряться в чатах, а владелец видит количество новых, активных и закрытых обращений.</p>",
          category: "Telegram automation",
        },
        en: {
          title: "Telegram bot for sales operations",
          shortDesc: "A Telegram bot turns chats into a managed sales pipeline",
          description:
            "<h2>Challenge</h2><p>The team received requests in Telegram groups, but there was no unified status, owner, or conversion report.</p><h2>Solution</h2><p>The bot collects contact data, service type, and budget, creates a card, alerts the manager, and reminds them about the next step.</p><h2>Impact</h2><p>Requests stopped disappearing in chats, and the owner sees new, active, and closed leads in one place.</p>",
          category: "Telegram automation",
        },
        uz: {
          title: "Sotuv uchun Telegram bot",
          shortDesc: "Telegram bot chatlarni boshqariladigan sotuv voronkasiga aylantiradi",
          description:
            "<h2>Muammo</h2><p>Jamoa arizalarni Telegram guruhlarida qabul qilardi, lekin yagona status, mas'ul manager va konversiya hisoboti yo'q edi.</p><h2>Yechim</h2><p>Bot kontakt, xizmat turi va budjetni yig'adi, kartochka yaratadi, managerga xabar beradi va keyingi qadamni eslatadi.</p><h2>Natija</h2><p>Arizalar chatlarda yo'qolmaydi, egasi yangi, faol va yopilgan murojaatlarni bitta joyda ko'radi.</p>",
          category: "Telegram avtomatlashtirish",
        },
      },
      featured: true,
      isActive: true,
      order: 2,
    },
    {
      title: "AI support knowledge base",
      slug: "ai-support-knowledge-base",
      description:
        "<h2>Задача</h2><p>Менеджеры каждый день отвечали на одни и те же вопросы, а качество ответа зависело от конкретного сотрудника.</p><h2>Решение</h2><p>Мы структурировали базу знаний, настроили AI-агента с безопасными ограничениями и добавили передачу сложных запросов человеку.</p><h2>Результат</h2><p>Клиенты получают быстрый ответ 24/7, а команда тратит время на сложные обращения вместо повторяющихся FAQ.</p>",
      shortDesc: "AI support agent отвечает из базы знаний и передает сложные кейсы менеджеру",
      category: "ai",
      client: "Support team",
      technologies: ["OpenAI", "LangChain", "React", "PostgreSQL"],
      images: ["/images/project-3.avif"],
      coverImage: "/images/project-3.avif",
      link: "",
      translations: {
        ru: {
          title: "AI support knowledge base",
          shortDesc: "AI support agent отвечает из базы знаний и передает сложные кейсы менеджеру",
          description:
            "<h2>Задача</h2><p>Менеджеры каждый день отвечали на одни и те же вопросы, а качество ответа зависело от конкретного сотрудника.</p><h2>Решение</h2><p>Мы структурировали базу знаний, настроили AI-агента с безопасными ограничениями и добавили передачу сложных запросов человеку.</p><h2>Результат</h2><p>Клиенты получают быстрый ответ 24/7, а команда тратит время на сложные обращения вместо повторяющихся FAQ.</p>",
          category: "AI support",
        },
        en: {
          title: "AI support knowledge base",
          shortDesc: "An AI support agent answers from approved knowledge and escalates complex cases",
          description:
            "<h2>Challenge</h2><p>Managers answered the same questions every day, and response quality depended on the individual employee.</p><h2>Solution</h2><p>We structured the knowledge base, configured an AI agent with clear guardrails, and added human handoff for complex requests.</p><h2>Impact</h2><p>Customers get fast 24/7 answers while the team spends time on complex cases instead of repeated FAQs.</p>",
          category: "AI support",
        },
        uz: {
          title: "AI support bilim bazasi",
          shortDesc: "AI support agent tasdiqlangan bilimdan javob beradi va murakkab holatlarni managerga uzatadi",
          description:
            "<h2>Muammo</h2><p>Managerlar har kuni bir xil savollarga javob berardi, javob sifati esa xodimga bog'liq edi.</p><h2>Yechim</h2><p>Bilim bazasini tuzdik, xavfsiz qoidalar bilan AI agent sozladik va murakkab so'rovlarni insonga uzatishni qo'shdik.</p><h2>Natija</h2><p>Mijozlar 24/7 tez javob oladi, jamoa esa takroriy FAQ o'rniga murakkab murojaatlar bilan ishlaydi.</p>",
          category: "AI support",
        },
      },
      featured: true,
      isActive: true,
      order: 3,
    },
    {
      title: "Operations dashboard and reporting",
      slug: "operations-dashboard-reporting",
      description:
        "<h2>Задача</h2><p>Данные были разбросаны между таблицами, CRM и чатами, поэтому решения принимались по неполной картине.</p><h2>Решение</h2><p>Мы собрали единый dashboard с источниками, статусами, SLA, загрузкой менеджеров и автоматическими уведомлениями.</p><h2>Результат</h2><p>Команда видит операционную картину каждый день, а не после ручной подготовки отчета в конце недели.</p>",
      shortDesc: "Dashboard показывает заявки, SLA и узкие места без ручных отчетов",
      category: "analytics",
      client: "Operations team",
      technologies: ["Next.js", "PostgreSQL", "Recharts", "API"],
      images: ["/images/project-4.avif"],
      coverImage: "/images/project-4.avif",
      link: "",
      translations: {
        ru: {
          title: "Operations dashboard and reporting",
          shortDesc: "Dashboard показывает заявки, SLA и узкие места без ручных отчетов",
          description:
            "<h2>Задача</h2><p>Данные были разбросаны между таблицами, CRM и чатами, поэтому решения принимались по неполной картине.</p><h2>Решение</h2><p>Мы собрали единый dashboard с источниками, статусами, SLA, загрузкой менеджеров и автоматическими уведомлениями.</p><h2>Результат</h2><p>Команда видит операционную картину каждый день, а не после ручной подготовки отчета в конце недели.</p>",
          category: "Analytics",
        },
        en: {
          title: "Operations dashboard and reporting",
          shortDesc: "A dashboard shows requests, SLA, and bottlenecks without manual reports",
          description:
            "<h2>Challenge</h2><p>Data was scattered across spreadsheets, CRM, and chats, so decisions were made with an incomplete picture.</p><h2>Solution</h2><p>We built one dashboard with sources, statuses, SLA, manager workload, and automatic notifications.</p><h2>Impact</h2><p>The team sees the operational picture every day, not after a manual report at the end of the week.</p>",
          category: "Analytics",
        },
        uz: {
          title: "Operatsion dashboard va hisobot",
          shortDesc: "Dashboard arizalar, SLA va tor joylarni qo'lda hisobotlarsiz ko'rsatadi",
          description:
            "<h2>Muammo</h2><p>Ma'lumotlar jadval, CRM va chatlarga tarqalgan edi, qarorlar to'liq bo'lmagan rasm asosida qabul qilinardi.</p><h2>Yechim</h2><p>Manba, status, SLA, manager yuklamasi va avtomatik xabarnomalar bilan yagona dashboard yaratdik.</p><h2>Natija</h2><p>Jamoa operatsion holatni hafta oxiridagi qo'lda hisobotdan keyin emas, har kuni ko'radi.</p>",
          category: "Analitika",
        },
      },
      featured: false,
      isActive: true,
      order: 4,
    },
  ];

  const projects = await Promise.all(
    projectSeeds.map((project) =>
      prisma.project.upsert({
        where: { slug: project.slug },
        update: {
          ...project,
          link: project.link || null,
        },
        create: {
          ...project,
          link: project.link || null,
        },
      })
    )
  );
  console.log(`Created ${projects.length} projects`);

  // Create team members
  const teamSeeds = [
    {
      id: "team-1",
      name: "Jakhongir Ruzibaev",
      position: "Founder & Automation Architect",
      bio: "Проектирует AI-автоматизацию, CRM-процессы и SaaS-продукты с фокусом на измеримый бизнес-результат.",
      photo: null,
      linkedin: "",
      github: "",
      telegram: "https://t.me/fullfocus",
      translations: {
        ru: {
          position: "Founder & Automation Architect",
          bio: "Проектирует AI-автоматизацию, CRM-процессы и SaaS-продукты с фокусом на измеримый бизнес-результат.",
        },
        en: {
          position: "Founder & Automation Architect",
          bio: "Designs AI automation, CRM workflows, and SaaS products with a focus on measurable business outcomes.",
        },
        uz: {
          position: "Founder & Automation Architect",
          bio: "AI avtomatlashtirish, CRM jarayonlari va SaaS mahsulotlarni o'lchanadigan biznes natijaga yo'naltirib loyihalaydi.",
        },
      },
      order: 1,
      isActive: true,
    },
    {
      id: "team-2",
      name: "FullFocus AI Team",
      position: "AI & Integrations",
      bio: "Собирает AI-агентов, интеграции, базы знаний и мониторинг, чтобы автоматизация работала стабильно после запуска.",
      photo: null,
      linkedin: "",
      github: "",
      telegram: "",
      translations: {
        ru: {
          position: "AI & Integrations",
          bio: "Собирает AI-агентов, интеграции, базы знаний и мониторинг, чтобы автоматизация работала стабильно после запуска.",
        },
        en: {
          position: "AI & Integrations",
          bio: "Builds AI agents, integrations, knowledge bases, and monitoring so automation keeps working after launch.",
        },
        uz: {
          position: "AI va integratsiyalar",
          bio: "AI agentlar, integratsiyalar, bilim bazalari va monitoringni yaratadi, avtomatlashtirish ishga tushgandan keyin ham barqaror ishlaydi.",
        },
      },
      order: 2,
      isActive: true,
    },
    {
      id: "team-3",
      name: "FullFocus Product Team",
      position: "Product & UX",
      bio: "Превращает сложные процессы в понятные интерфейсы для менеджеров, владельцев и клиентов.",
      photo: null,
      linkedin: "",
      github: "",
      telegram: "",
      translations: {
        ru: {
          position: "Product & UX",
          bio: "Превращает сложные процессы в понятные интерфейсы для менеджеров, владельцев и клиентов.",
        },
        en: {
          position: "Product & UX",
          bio: "Turns complex workflows into clear interfaces for managers, owners, and customers.",
        },
        uz: {
          position: "Product va UX",
          bio: "Murakkab jarayonlarni manager, egalar va mijozlar uchun tushunarli interfeyslarga aylantiradi.",
        },
      },
      order: 3,
      isActive: true,
    },
  ];

  const teamMembers = await Promise.all(
    teamSeeds.map((member) =>
      prisma.teamMember.upsert({
        where: { id: member.id },
        update: member,
        create: member,
      })
    )
  );
  console.log(`Created ${teamMembers.length} team members`);

  // Create testimonials
  const testimonialSeeds = [
    {
      id: "testimonial-1",
      clientName: "Akmal R.",
      company: "Education center",
      position: "Founder",
      content:
        "После внедрения Telegram + CRM flow менеджеры перестали терять заявки. Видим источник, статус и следующий шаг по каждому лиду.",
      translations: {
        ru: {
          content:
            "После внедрения Telegram + CRM flow менеджеры перестали терять заявки. Видим источник, статус и следующий шаг по каждому лиду.",
          position: "Founder",
        },
        en: {
          content:
            "After the Telegram + CRM flow launch, managers stopped losing leads. We see the source, status, and next action for every request.",
          position: "Founder",
        },
        uz: {
          content:
            "Telegram + CRM flow ishga tushgandan keyin managerlar arizalarni yo'qotmayapti. Har bir lead manbasi, statusi va keyingi qadami ko'rinadi.",
          position: "Founder",
        },
      },
      rating: 5,
      isActive: true,
      order: 1,
    },
    {
      id: "testimonial-2",
      clientName: "Madina K.",
      company: "Service business",
      position: "Operations Lead",
      content:
        "AI-аудит быстро показал, где мы теряем время. Через несколько недель рутинные отчеты и напоминания уже работали автоматически.",
      translations: {
        ru: {
          content:
            "AI-аудит быстро показал, где мы теряем время. Через несколько недель рутинные отчеты и напоминания уже работали автоматически.",
          position: "Operations Lead",
        },
        en: {
          content:
            "The AI audit quickly showed where we were losing time. Within a few weeks, routine reports and reminders were running automatically.",
          position: "Operations Lead",
        },
        uz: {
          content:
            "AI audit vaqt qayerda yo'qolayotganini tez ko'rsatdi. Bir necha haftada oddiy hisobot va eslatmalar avtomatik ishlay boshladi.",
          position: "Operations Lead",
        },
      },
      rating: 5,
      isActive: true,
      order: 2,
    },
    {
      id: "testimonial-3",
      clientName: "Dilshod S.",
      company: "B2B sales",
      position: "CEO",
      content:
        "Нам не просто написали код, а помогли собрать процесс: кто отвечает, когда follow-up, какие метрики смотрит руководитель.",
      translations: {
        ru: {
          content:
            "Нам не просто написали код, а помогли собрать процесс: кто отвечает, когда follow-up, какие метрики смотрит руководитель.",
          position: "CEO",
        },
        en: {
          content:
            "They did not just write code. They helped design the process: who owns the lead, when to follow up, and which metrics management should watch.",
          position: "CEO",
        },
        uz: {
          content:
            "Ular faqat kod yozmadi, jarayonni ham yig'ib berdi: kim javobgar, follow-up qachon, rahbar qaysi metrikani ko'radi.",
          position: "CEO",
        },
      },
      rating: 5,
      isActive: true,
      order: 3,
    },
  ];

  const testimonials = await Promise.all(
    testimonialSeeds.map((testimonial) =>
      prisma.testimonial.upsert({
        where: { id: testimonial.id },
        update: testimonial,
        create: testimonial,
      })
    )
  );
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
        coverImage: "/images/blog-automation-audit.avif",
        translations: {
          ru: {
            title: "Автоматизация бизнес-процессов: с чего начать",
            excerpt:
              "Практичный способ понять, какие процессы автоматизировать первыми и где быстрее появится ROI.",
            content: `<p>Автоматизацию не нужно начинать с большого рискованного проекта. Лучший первый шаг - найти повторяющийся процесс, который регулярно забирает время команды или мешает быстро обработать заявки.</p>
<h2>Как выбрать первый процесс?</h2>
<p>Выпишите задачи за неделю: прием лидов, ответы клиентам, обновление CRM, отчеты, напоминания по оплате, генерация документов. Затем оцените, где задержка сразу влияет на деньги.</p>
<ul>
  <li>Процесс повторяется каждый день?</li>
  <li>Ошибка или задержка приводит к потере заявки?</li>
  <li>Результат можно измерить в часах, лидах или выручке?</li>
</ul>
<h2>Где обычно быстрее ROI?</h2>
<p>Telegram lead capture, CRM reminders, задачи менеджерам, отчеты из Google Sheets и AI support agent чаще всего дают быстрый и измеримый эффект.</p>`,
            category: "AI-автоматизация",
            tags: ["автоматизация бизнеса", "AI аудит", "автоматизация процессов"],
          },
          en: {
            title: "Business process automation: where to start",
            excerpt:
              "A practical way to choose the first processes to automate and find the fastest ROI.",
            content: `<p>Automation does not have to start as a large risky project. The best first step is usually a repetitive process that consumes team time or slows down lead response.</p>
<h2>How to choose the first process?</h2>
<p>List weekly tasks: lead intake, customer replies, CRM updates, reports, payment reminders, or document generation. Then identify where delay directly costs money.</p>
<ul>
  <li>Does the process repeat every day?</li>
  <li>Does an error or delay lose revenue?</li>
  <li>Can the outcome be measured in hours, leads, or revenue?</li>
</ul>
<h2>Where ROI usually appears faster</h2>
<p>Telegram lead capture, CRM reminders, manager task flows, Google Sheets reporting, and AI support agents are often strong first candidates.</p>`,
            category: "AI automation",
            tags: ["business automation", "AI audit", "process automation"],
          },
        },
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
        coverImage: "/images/blog-telegram-bot.avif",
        translations: {
          ru: {
            title: "Telegram-бот для бизнеса: лиды, CRM и отчеты",
            excerpt:
              "Как не терять заявки из Telegram и автоматически передавать их в CRM, менеджерам и отчеты.",
            content: `<p>Для многих компаний в Узбекистане Telegram - основной канал общения с клиентами. Поэтому бот может быть не просто FAQ, а полноценным слоем lead capture, CRM, reminders и мини-отчетов.</p>
<h2>Что автоматизирует Telegram-бот?</h2>
<ul>
  <li>Собирает имя, телефон, услугу и бюджет клиента.</li>
  <li>Создает лид в CRM или Google Sheets.</li>
  <li>Отправляет уведомление ответственному менеджеру.</li>
  <li>Показывает клиенту следующий шаг и статус.</li>
</ul>
<h2>Где помогает AI agent?</h2>
<p>AI agent отвечает на частые вопросы, уточняет проблему клиента и передает сложные диалоги менеджеру с кратким резюме.</p>`,
            category: "Telegram-боты",
            tags: ["Telegram bot", "CRM автоматизация", "lead automation"],
          },
          en: {
            title: "Telegram bot for business: leads, CRM, and reports",
            excerpt:
              "How to stop losing Telegram requests and send them automatically to CRM, managers, and reports.",
            content: `<p>For many companies in Uzbekistan, Telegram is the main customer communication channel. A bot can become more than FAQ: it can handle lead capture, CRM updates, reminders, and mini reports.</p>
<h2>What does a Telegram bot automate?</h2>
<ul>
  <li>Collects customer name, phone, service, and budget.</li>
  <li>Creates a lead in CRM or Google Sheets.</li>
  <li>Sends a notification to the responsible manager.</li>
  <li>Shows the customer the next step and status.</li>
</ul>
<h2>Where does an AI agent help?</h2>
<p>An AI agent answers frequent questions, clarifies the customer problem, and escalates complex chats to a manager with a short summary.</p>`,
            category: "Telegram bots",
            tags: ["Telegram bot", "CRM automation", "lead automation"],
          },
        },
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
        coverImage: "/images/blog-crm-automation.avif",
        translations: {
          ru: {
            title: "CRM-автоматизация: контроль воронки продаж",
            excerpt:
              "Как автоматизировать лиды, задачи менеджеров, follow-up и отчеты внутри CRM.",
            content: `<p>Если CRM остается только списком клиентов, она дает мало пользы бизнесу. Цель автоматизации CRM - сделать следующий шаг, ответственного, срок и результат понятными для каждого лида.</p>
<h2>Что автоматизировать первым?</h2>
<ul>
  <li>Создание лидов из сайта, Telegram и рекламных форм.</li>
  <li>Автоматическое назначение менеджера и reminders.</li>
  <li>SLA alerts по лидам без ответа.</li>
  <li>Еженедельные отчеты по продажам.</li>
</ul>
<h2>Какой результат ожидать?</h2>
<p>Правильно настроенная CRM снижает потери лидов, повышает дисциплину менеджеров и показывает владельцу реальную воронку продаж.</p>`,
            category: "CRM-автоматизация",
            tags: ["CRM автоматизация", "воронка продаж", "бизнес-процесс"],
          },
          en: {
            title: "CRM automation: controlling the sales funnel",
            excerpt:
              "How to automate leads, manager tasks, follow-ups, and reporting inside CRM.",
            content: `<p>If CRM is only a customer list, it delivers little business value. CRM automation makes the next step, owner, deadline, and outcome clear for every lead.</p>
<h2>What should be automated first?</h2>
<ul>
  <li>Lead creation from website, Telegram, and ad forms.</li>
  <li>Automatic manager assignment and reminders.</li>
  <li>SLA alerts for unanswered leads.</li>
  <li>Weekly sales reports.</li>
</ul>
<h2>What result should you expect?</h2>
<p>A well-configured CRM reduces lost leads, improves manager discipline, and gives the owner a real-time view of the sales funnel.</p>`,
            category: "CRM automation",
            tags: ["CRM automation", "sales funnel", "business process"],
          },
        },
        isPublished: true,
        publishedAt: new Date("2026-06-21"),
      },
    }),
  ]);
  console.log(`Created ${blogPosts.length} blog posts`);

  // Create settings
  const settings = [
    { key: "companyName", value: "FullFocus" },
    {
      key: "companyDescription",
      value:
        "AI-автоматизация, Telegram/CRM workflows, AI-агенты и SaaS-продукты для бизнеса, который хочет расти без лишней ручной работы.",
    },
    { key: "phone", value: "+998 90 123 45 67" },
    { key: "email", value: "hello@fullfocus.dev" },
    { key: "address", value: "Ташкент, Узбекистан" },
    { key: "telegram", value: "https://t.me/fullfocus" },
    { key: "github", value: "https://github.com/fullfocus" },
    {
      key: "metaTitle",
      value: "FullFocus — AI automation, CRM workflows and SaaS",
    },
    {
      key: "metaDescription",
      value:
        "AI-агенты, Telegram/CRM автоматизация, операционные дашборды и SaaS-разработка для измеримого роста бизнеса.",
    },
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

  const contentBlocks = [
    {
      key: "home.hero",
      locale: "ru",
      payload: {
        badge: "AI-автоматизация для роста",
        titleLine1: "Автоматизируем заявки,",
        titleLine2: "продажи и поддержку.",
        titleLine3: "Вы масштабируете бизнес.",
        subtitle:
          "AI-агенты, Telegram/CRM workflows и SaaS-инструменты, которые сокращают ручную работу и показывают ROI в цифрах.",
        cta: "Получить AI-аудит",
        secondaryCta: "Посмотреть кейсы",
      },
    },
    {
      key: "home.hero",
      locale: "en",
      payload: {
        badge: "AI automation for growth",
        titleLine1: "Automate leads,",
        titleLine2: "sales and support.",
        titleLine3: "Scale the business.",
        subtitle:
          "AI agents, Telegram/CRM workflows, and SaaS tools that cut manual work and show ROI in clear numbers.",
        cta: "Get an AI audit",
        secondaryCta: "View case studies",
      },
    },
    {
      key: "home.hero",
      locale: "uz",
      payload: {
        badge: "O'sish uchun AI avtomatlashtirish",
        titleLine1: "Ariza, sotuv va",
        titleLine2: "supportni avtomatlashtiramiz.",
        titleLine3: "Siz biznesni kengaytirasiz.",
        subtitle:
          "AI agentlar, Telegram/CRM workflow va SaaS vositalar qo'lda ishni kamaytiradi va ROIni raqam bilan ko'rsatadi.",
        cta: "AI-audit olish",
        secondaryCta: "Keyslarni ko'rish",
      },
    },
    {
      key: "home.cta",
      locale: "ru",
      payload: {
        title: "Найдём, где автоматизация быстрее всего вернёт деньги",
        subtitle:
          "За 30 минут разберём процессы, заявки и CRM. После звонка получите 3+ конкретные точки автоматизации.",
        button: "Записаться на AI-аудит",
      },
    },
    {
      key: "home.cta",
      locale: "en",
      payload: {
        title: "Find the automation points that pay back first",
        subtitle:
          "In 30 minutes we review your processes, leads, and CRM. You leave with 3+ concrete automation opportunities.",
        button: "Book an AI audit",
      },
    },
    {
      key: "home.cta",
      locale: "uz",
      payload: {
        title: "Eng tez pul qaytaradigan avtomatlashtirish nuqtalarini topamiz",
        subtitle:
          "30 daqiqada jarayon, ariza va CRMni ko'rib chiqamiz. Suhbatdan keyin 3+ aniq avtomatlashtirish imkoniyatini olasiz.",
        button: "AI-auditga yozilish",
      },
    },
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: {
        key_locale: {
          key: block.key,
          locale: block.locale,
        },
      },
      update: {
        payload: block.payload,
        isActive: true,
      },
      create: {
        ...block,
        isActive: true,
      },
    });
  }
  console.log(`Created ${contentBlocks.length} content blocks`);

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
