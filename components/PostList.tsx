"use client"; // 👈 Next.js에게 "이건 브라우저에서 실시간으로 움직이는 컴포넌트야!" 라고 알려줍니다.

import { useState } from "react";
import Link from "next/link";

// 우리가 받을 데이터의 모양을 정의합니다.
type Post = {
  id: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export default function PostList({ posts, viewCounts }: { posts: Post[], viewCounts: Record<string, number> }) {
  // 👇 사용자가 입력한 검색어와 선택한 태그를 기억하는 '상태(State)' 입니다.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  // 👇 검색어와 태그 조건에 맞는 글만 걸러냅니다!
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div>
      {/* 🔍 검색창 영역 */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="검색어를 입력하세요... (예: React, 회고)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* 🏷️ 태그 필터 영역 (이제 URL 이동 없이 즉각적으로 바뀝니다!) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedTag ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          전체보기
        </button>
        {allTags.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* 📝 글 목록 영역 */}
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
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
