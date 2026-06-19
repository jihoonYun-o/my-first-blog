// export default function Home() {
//   return (
//     <main className="min-h-screen p-8 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mt-10">My Blog</h1>
//       <p className="mt-4 text gray-600">Contents</p>
//     </main>
//     // Tailwind CSS 
//     // 3xl : 글자 크기 크게, bold: 굵게, mt-10: 위쪽 여백
//   );
// }
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts"; // 방금 만든 도우미 함수를 불러옵니다.

export default function Home() {
  // 도우미 함수를 실행해서 모든 글 데이터를 가져옵니다.
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mt-10 mb-8">Posts</h1>
      
      {/* 글 목록을 보여주는 영역 */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          // 각 글을 클릭하면 해당 글 페이지로 이동하도록 Link를 겁니다.
          <Link 
            href={`/posts/${post.id}`} 
            key={post.id}
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{post.description}</p>
            <time className="text-xs text-gray-400">{post.date}</time>
          </Link>
        ))}
      </div>
    </main>
  );
}
