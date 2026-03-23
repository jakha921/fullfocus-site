import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PublicOnlyWrapper } from "@/components/site";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
    locale: "en_US",
    url: "https://fullfocus.dev",
    siteName: "FullFocus",
    title: "FullFocus - AI Business Automation",
    description: "AI-powered business automation. AI agents, process automation, SaaS development.",
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
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-white min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <PublicOnlyWrapper />
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
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
