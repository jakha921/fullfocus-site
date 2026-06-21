export type ServiceLandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  badge: string;
  hero: string;
  subhero: string;
  outcomes: string[];
  problems: string[];
  workflow: {
    title: string;
    description: string;
  }[];
  integrations: string[];
  timeline: string;
  startingPrice: string;
  startingPriceAmount: number;
};

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: "telegram-bot-automation",
    title: "Telegram Bot Automation",
    metaTitle: "Telegram Bot Automation for Business",
    description:
      "Telegram bots for lead capture, support, CRM updates, payments, reminders, and internal workflow automation.",
    keywords: [
      "Telegram bot automation",
      "Telegram bot for business",
      "Telegram CRM automation",
      "business automation Uzbekistan",
    ],
    badge: "Telegram automation",
    hero: "Telegram bots that turn chats into structured business processes.",
    subhero:
      "We connect Telegram with CRM, Google Sheets, websites, payment flows, notifications, and AI agents so leads and tasks stop getting lost in chats.",
    outcomes: [
      "Lead capture from Telegram with automatic CRM creation.",
      "AI answers for common client questions with handoff to a manager.",
      "Internal notifications for sales, support, finance, and operations.",
      "Mini-reports, reminders, forms, and document generation inside chat.",
    ],
    problems: [
      "Managers manually copy client messages into CRM or spreadsheets.",
      "Leads arrive after hours and wait too long for the first response.",
      "Important requests disappear in group chats.",
      "There is no clean report on lead source, status, SLA, and revenue.",
    ],
    workflow: [
      {
        title: "Map chat flows",
        description:
          "We identify lead sources, client questions, manager actions, statuses, and handoff rules.",
      },
      {
        title: "Build bot MVP",
        description:
          "We launch forms, commands, AI replies, notifications, and admin-friendly scenarios.",
      },
      {
        title: "Connect systems",
        description:
          "We sync Telegram with CRM, Google Sheets, website forms, payment systems, and analytics.",
      },
      {
        title: "Measure and improve",
        description:
          "We add reports, error alerts, conversion tracking, and monthly automation improvements.",
      },
    ],
    integrations: ["Telegram", "CRM", "Google Sheets", "Website forms", "OpenAI", "Payments"],
    timeline: "2-6 weeks",
    startingPrice: "from $1,800",
    startingPriceAmount: 1800,
  },
  {
    slug: "crm-automation",
    title: "CRM Automation",
    metaTitle: "CRM Automation for Sales and Operations",
    description:
      "CRM automation for lead routing, follow-ups, pipeline visibility, manager tasks, reporting, and integrations.",
    keywords: [
      "CRM automation",
      "sales automation",
      "CRM integration",
      "business process automation",
    ],
    badge: "CRM automation",
    hero: "A CRM that works as a system, not as a manual notebook.",
    subhero:
      "We automate lead routing, follow-ups, reminders, pipeline stages, tasks, and reports so your team can focus on closing deals.",
    outcomes: [
      "Automatic lead creation from site forms, Telegram, WhatsApp, and ads.",
      "Follow-up reminders and SLA alerts for managers.",
      "Pipeline dashboards for revenue, conversion, and bottlenecks.",
      "Clean integrations with spreadsheets, email, documents, and internal tools.",
    ],
    problems: [
      "Managers forget follow-ups or update statuses too late.",
      "Leads are split between forms, chats, spreadsheets, and calls.",
      "Owners do not see a real-time pipeline picture.",
      "Reports are prepared manually at the end of the week or month.",
    ],
    workflow: [
      {
        title: "Audit the pipeline",
        description:
          "We map lead sources, stages, owner rules, required fields, and reporting needs.",
      },
      {
        title: "Automate lead flow",
        description:
          "We connect forms, chat channels, assignment logic, reminders, and duplicate checks.",
      },
      {
        title: "Build reports",
        description:
          "We create dashboards for conversion, revenue, response time, lost reasons, and manager workload.",
      },
      {
        title: "Train the team",
        description:
          "We document the process and create simple operating rules for daily use.",
      },
    ],
    integrations: ["CRM", "Telegram", "WhatsApp", "Website forms", "Google Sheets", "Email"],
    timeline: "3-8 weeks",
    startingPrice: "from $2,500",
    startingPriceAmount: 2500,
  },
  {
    slug: "ai-support-agent",
    title: "AI Support Agent",
    metaTitle: "AI Support Agent for Websites and Telegram",
    description:
      "AI support agents for websites, Telegram, and internal teams with knowledge base, lead qualification, and human handoff.",
    keywords: [
      "AI support agent",
      "AI chatbot for website",
      "AI customer support",
      "Telegram AI chatbot",
    ],
    badge: "AI support",
    hero: "AI support that answers fast, qualifies leads, and knows when to hand off.",
    subhero:
      "We build AI agents for support, sales qualification, FAQ handling, and internal knowledge search with clear escalation to your team.",
    outcomes: [
      "24/7 answers for common customer questions.",
      "Lead qualification before a manager joins the conversation.",
      "Knowledge-base search for website, Telegram, and internal teams.",
      "Human handoff, conversation summaries, and CRM updates.",
    ],
    problems: [
      "Clients wait for answers outside working hours.",
      "Managers repeat the same explanations every day.",
      "Support quality depends too much on individual employees.",
      "There is no searchable source of truth for answers and policies.",
    ],
    workflow: [
      {
        title: "Prepare knowledge",
        description:
          "We structure FAQs, policies, service descriptions, product data, and examples of good answers.",
      },
      {
        title: "Build agent behavior",
        description:
          "We define tone, guardrails, fallback rules, qualification questions, and escalation logic.",
      },
      {
        title: "Connect channels",
        description:
          "We launch the agent on the website, Telegram, CRM, or internal support tools.",
      },
      {
        title: "Test and monitor",
        description:
          "We evaluate answers, track failed questions, improve prompts, and tune the knowledge base.",
      },
    ],
    integrations: ["OpenAI", "Telegram", "Website chat", "CRM", "Knowledge base", "Analytics"],
    timeline: "3-7 weeks",
    startingPrice: "from $2,200",
    startingPriceAmount: 2200,
  },
];

export function getServiceLandingPage(slug: string): ServiceLandingPage | undefined {
  return serviceLandingPages.find((page) => page.slug === slug);
}
