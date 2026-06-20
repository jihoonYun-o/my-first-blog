import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { supabase } from "../lib/supabase";

// 👇 캐시를 완벽하게 끄는 가장 강력한 명령어 2줄입니다.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const allPosts = getSortedPostsData();

  // 👇 DB에서 조회수를 가져오고, 터미널에 출력해 봅니다!
  const { data: views, error } = await supabase.from('views').select('*');
  
  console.log("=================================");
  console.log("🚨 1. DB 에러:", error);
  console.log("📊 2. DB 데이터:", views);
  console.log("📝 3. 내 글 아이디:", allPosts.map(p => p.id));
  console.log("=================================");

  const viewCounts = views?.reduce((acc, view) => {
    acc[view.slug] = view.count;
    return acc;
  }, {} as Record<string, number>) || {};

  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])));
  const filteredPosts = tag
    ? allPosts.filter(post => post.tags?.includes(tag))
    : allPosts;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mt-10 mb-8 text-gray-900 dark:text-gray-100">Posts</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!tag ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
          전체보기
        </Link>
        {allTags.map(t => (
          <Link key={t} href={`/?tag=${t}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tag === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
            #{t}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>👀 {viewCounts[post.id] || 0} views</span>
                </div>
                
                <div className="flex gap-2">
                  {post.tags?.map(t => (
                    <span key={t} className="text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">{t}</span>
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
