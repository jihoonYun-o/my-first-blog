import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      {/*  Posts 제목도 다크모드에서 하얗게 보이도록 수정 */}
      <h1 className="text-3xl font-bold mt-10 mb-8 text-gray-900 dark:text-gray-100">Posts</h1>
      
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link 
            href={`/posts/${post.id}`} 
            key={post.id}
            //  카드 배경(bg)과 테두리(border)에 다크모드 색상 추가!
            className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            {/* 제목, 설명, 날짜 글씨 색상도 다크모드에 맞게 밝게 추가! */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{post.description}</p>
            <time className="text-xs text-gray-400 dark:text-gray-500">{post.date}</time>
          </Link>
        ))}
      </div>
    </main>
  );
}
