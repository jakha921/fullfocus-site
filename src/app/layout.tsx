import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PublicOnlyWrapper } from "@/components/site";

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
    default: "FullFocus - IT Solutions",
    template: "%s | FullFocus",
  },
  description:
    "Creating modern IT products that help businesses grow. Web development, mobile apps, UI/UX design, ERP/CRM systems.",
  keywords: [
    "IT company",
    "web development",
    "mobile apps",
    "UI/UX design",
    "ERP",
    "CRM",
  ],
  authors: [{ name: "FullFocus" }],
  creator: "FullFocus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://site.fullfocus.dev",
    siteName: "FullFocus",
    title: "FullFocus - IT Solutions",
    description: "Creating modern IT products that help businesses grow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-white min-h-screen">
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
      </body>
    </html>
  );
}
