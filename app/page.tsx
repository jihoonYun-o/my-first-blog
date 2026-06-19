import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";

// 👇 주소창의 쿼리(?tag=React)를 읽어오기 위해 searchParams를 추가합니다.
export default async function Home({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const allPosts = getSortedPostsData();

  // 1. 모든 글에서 태그만 쏙쏙 뽑아서 중복을 제거합니다. (예: ['일상', '회고', 'Next.js'])
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])));

  // 2. 선택된 태그가 있으면 그 태그가 포함된 글만 남기고, 없으면 전체 글을 보여줍니다.
  const filteredPosts = tag
    ? allPosts.filter(post => post.tags?.includes(tag))
    : allPosts;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mt-10 mb-8 text-gray-900 dark:text-gray-100">Posts</h1>

      {/* 🏷️ 태그 필터 버튼 영역 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !tag ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          전체보기
        </Link>
        {allTags.map(t => (
          <Link
            key={t}
            href={`/?tag=${t}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tag === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            #{t}
          </Link>
        ))}
      </div>

      {/* 📝 글 목록 영역 */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link 
              href={`/posts/${post.id}`} 
              key={post.id}
              className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <time className="text-xs text-gray-400 dark:text-gray-500">{post.date}</time>
                {/* 카드 안에도 작게 태그를 보여줍니다 */}
                <div className="flex gap-2">
                  {post.tags?.map(t => (
                    <span key={t} className="text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">해당 태그의 글이 없습니다.</p>
        )}
      </div>
    </main>
  );
}
