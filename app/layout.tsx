import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "问得出来 — 理解力与提问训练",
  description:
    "通过游戏化互动，把「我看不懂」拆解成「我知道哪里不懂，并且能问出好问题」。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 has-[.admin-shell]:max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
