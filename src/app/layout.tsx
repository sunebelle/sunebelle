import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sunebelle | Creative Coder & Web Systems Architect",
    template: "%s | Sunebelle"
  },
  description: "Portfolio of Sunebelle, a creative developer in HCMC, Vietnam specializing in B2B workflow automations, performant dashboards, and responsive web platforms.",
  keywords: ["Sunebelle", "Creative Coder", "Portfolio", "Frontend", "Next.js", "HCMC", "Vietnam", "Web Automation", "B2B Dashboards"],
  authors: [{ name: "Sunebelle" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sunebelle | Creative Coder & Web Systems Architect",
    description: "Portfolio of Sunebelle, specializing in automated B2B workflows, high-performance dashboards, and modern business web platforms.",
    url: "https://sunebelle.dev",
    siteName: "Sunebelle Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunebelle | Creative Coder & Web Systems Architect",
    description: "Portfolio of Sunebelle, a passionate Creative Coder based in HCMC, Vietnam.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
