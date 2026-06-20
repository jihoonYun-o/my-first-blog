import { getSortedPostsData } from "../lib/posts";
import { supabase } from "../lib/supabase";
import PostList from "../components/PostList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // 노션에서 데이터 가져오기!
  const allPosts = await getSortedPostsData();

  // Supabase에서 조회수 가져오기!
  const { data: views } = await supabase.from('views').select('*');
  
  const viewCounts = views?.reduce((acc, view) => {
    acc[view.slug] = view.count;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mt-10 mb-8 text-gray-900 dark:text-gray-100">Posts</h1>
      
      <PostList posts={allPosts} viewCounts={viewCounts} />
    </main>
  );
}
