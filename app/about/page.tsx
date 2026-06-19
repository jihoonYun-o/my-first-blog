export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">소개 🙋‍♂️</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* 1. 프로필 영역 */}
        <div className="flex flex-col md:flex-row gap-6 items-center mb-8 border-b border-gray-100 pb-8">
          {/* 프로필 이미지 (나중에 진짜 사진으로 바꿀 수 있습니다) */}
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-5xl shrink-0">
            👨‍💻
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">(Jihoon Yun)</h2>
            <p className="text-gray-600 mb-4">
              프론트엔드 개발자를 꿈꾸는 예비 개발자입니다.   

              새로운 기술을 배우고 직접 만들어보며 문제를 해결하는 과정을 즐깁니다.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <a href="https://github.com/jihoonYun-o" target="_blank" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                GitHub 방문
              </a>
              {/* 👇 본인의 진짜 이메일 주소로 바꿔주세요! */}
              <a href="mailto:fjm879487@gmail.com" className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition">
                이메일 보내기
              </a>
            </div>
          </div>
        </div>

        {/* 2. 기술 스택 영역 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-900">기술 스택 (Tech Stack )</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium">HTML/CSS</span>
            <span className="px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-medium">JavaScript</span>
            <span className="px-3 py-1.5 bg-cyan-50 text-cyan-600 rounded-lg text-sm font-medium">React</span>
            <span className="px-3 py-1.5 bg-black text-white rounded-lg text-sm font-medium">Next.js</span>
            <span className="px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg text-sm font-medium">Tailwind CSS</span>
          </div>
        </div>

        {/* 3. 프로젝트 영역 */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900"> 프로젝트 (Projects)</h3>
          <div className="p-5 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <h4 className="font-bold text-gray-900 text-lg">나만의 기술 블로그 (My Blog)</h4>
            <p className="text-sm text-gray-500 mb-3">2026.06 - 현재</p>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Next.js와 Tailwind CSS를 활용하여 바닥부터 직접 개발한 정적 블로그입니다.   

              마크다운 기반의 글쓰기 시스템을 구축하고, Giscus를 연동하여 소통형 블로그를 완성했습니다.
            </p>
            {/* 👇 본인의 Vercel 주소로 바꿔주세요! */}
            <a href="https://my-first-blog-virid.vercel.app" target="_blank" className="text-blue-600 text-sm font-medium hover:underline">
              🔗 서비스 바로가기
            </a>
          </div>
        </div>

      </div>
    </main>
   );
}
