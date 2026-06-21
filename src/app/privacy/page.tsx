import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "FullFocus privacy policy for website forms, AI automation audit submissions, analytics, and client communications.",
  keywords: ["FullFocus privacy policy", "website privacy", "automation audit privacy"],
});

const sections = [
  {
    title: "What we collect",
    body: "When you submit a contact form or automation audit, we may collect your name, email, phone, company, project details, selected answers, and message content.",
  },
  {
    title: "How we use it",
    body: "We use this data to respond to your request, prepare a mini-report, estimate automation scope, improve our website, and manage leads in the FullFocus admin panel.",
  },
  {
    title: "Telegram notifications",
    body: "Form and quiz submissions may trigger internal Telegram notifications so our team can respond faster. Public mini-report links are not listed in the sitemap and should not be shared if they contain sensitive business context.",
  },
  {
    title: "Data sharing",
    body: "We do not sell lead data. We may use infrastructure, hosting, analytics, email, CRM, and messaging providers only to operate the website and communicate with you.",
  },
  {
    title: "Contact",
    body: "To request correction or deletion of your submitted data, contact us at hello@fullfocus.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-medium text-teal-300">FullFocus</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-zinc-400">Last updated: June 21, 2026</p>

        <div className="mt-10 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-7 text-zinc-300">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
