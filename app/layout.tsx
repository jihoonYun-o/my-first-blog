import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers"; 
import ThemeToggle from "../components/ThemeToggle"; 
import { Analytics } from "@vercel/analytics/react";
import "highlight.js/styles/atom-one-dark.css";
export const metadata: Metadata = {
  title: "나만의 블로그",
  description: "Next.js와 Tailwind CSS로 만든 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="ko" suppressHydrationWarning>
   
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        
        <Providers>
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-8 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              MyBlog.
            </a>

            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">홈</a>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">소개</Link>
                <ThemeToggle />
            </nav>
            </div>
          </header>

          <div className="min-h-screen">
            {children}
          </div>

          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-8 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              © 2026 MyBlog. All rights reserved.
            </div>
          </footer>
        </Providers>
        <Analytics></Analytics>
      </body>
    </html>
  );
}
