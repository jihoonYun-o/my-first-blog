// 필요한 Tool들을 불러오기(import)
import type { Metadata } from "next"; // 웹페이지 정보(메타데이터)를 설정
import "./globals.css"; // TailWind CSS를 전체 페이지에 적용
import Link from "next/link"; // 부드럽게 페이지 이동 
import { Providers } from "./providers";
import ThemeToggle from "../components/ThemeToggle";

// 블로그 기본 정보 설정 및 SEO 최적화
// 브라우저 탭에 뜨는 이름과 구글 검색 시 나오는 설명
export const metadata:Metadata = {
  title: "My Blog",
  description: "Next.js와 TailWind CSS로 만든 개인 블로그"
}

// 모든 페이지의 공통 뼈대
// 안의 내용은 어떤 페이지를 가든 항상 유지
export default function RootLayout({
  children, // 이 자리에 page.tsx가 들어감
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 웹페이지의 기본 언어를 한국어로 설정
    <html lang="ko" suppressContentEditableWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <Providers>
          <header className="bg-white border-b border-gray-200">
          
            <div className="max-w-3xl mx-auto px-8 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                My blog
              </Link>

              <nav className="flex gap-6 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
                <Link href="/about" className="hover:text-blue-600 transition-colors">소개</Link>
                <ThemeToggle></ThemeToggle>
              </nav>
            </div>  
          </header>

          <div className="min-h-screen"> 
            {children}
          </div>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-3xl mx-auto px-8 py-8 text-center text-sm text-gray-400">
            © 2026 MyBlog. All rights reserved.
            </div>
          </footer>
          </Providers>
      </body>
    </html>
  );
}