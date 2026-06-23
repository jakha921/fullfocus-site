import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PublicOnlyWrapper } from "@/components/site";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { OrganizationJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://fullfocus.dev"),
  title: {
    default: "FullFocus - AI Business Automation",
    template: "%s | FullFocus",
  },
  description:
    "AI-powered business automation agency. We build AI agents, automate processes, and develop SaaS products. 300% ROI in 3-6 months.",
  keywords: [
    "AI agents",
    "business automation",
    "process automation",
    "AI chatbots",
    "SaaS development",
    "system integration",
    "Tashkent IT company",
  ],
  authors: [{ name: "FullFocus" }],
  creator: "FullFocus",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://fullfocus.dev",
    siteName: "FullFocus",
    title: "FullFocus - AI Business Automation",
    description: "AI-powered business automation. AI agents, process automation, SaaS development.",
    images: [
      {
        url: "/images/hero-automation-dashboard.avif",
        width: 1672,
        height: 941,
        alt: "FullFocus AI automation dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FullFocus - AI Business Automation",
    description: "AI-powered business automation. AI agents, process automation, SaaS development.",
    images: ["/images/hero-automation-dashboard.avif"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#0a0a0a] text-white min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <PublicOnlyWrapper />
          <OrganizationJsonLd locale={locale} />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                border: "1px solid #27272a",
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
