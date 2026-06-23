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
  let updatedCovers = 0;
  for (const post of starterPosts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
      select: { id: true, coverImage: true, translations: true },
    });

    if (existing) {
      const updateData = {};
      if (!existing.coverImage) {
        updateData.coverImage = post.coverImage;
        updatedCovers += 1;
      }
      if (!existing.translations) {
        updateData.translations = post.translations;
      }
      if (Object.keys(updateData).length > 0) {
        await prisma.blogPost.update({
          where: { slug: post.slug },
          data: updateData,
        });
      }
      continue;
    }

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
    `[seo-content] Ready. Created ${created} starter posts; updated ${updatedCovers} covers; hidden ${hiddenLegacy.count} legacy demo posts`
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
