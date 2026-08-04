import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunebelle | Creative Coder",
  description: "Portfolio of Sunebelle, a passionate Creative Coder based in HCMC, Vietnam.",
  keywords: ["Sunebelle", "Creative Coder", "Portfolio", "Frontend", "Next.js", "HCMC", "Vietnam"],
  authors: [{ name: "Sunebelle" }],
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
