import { getPostData } from "../../../lib/posts";
import Comments from "../../../components/Comments";
import { supabase } from "../../../lib/supabase"; // 👈 Supabase 불러오기

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);
  return { title: postData.title, description: postData.description };
}

export default async function Post({ params }: { params: Promise<{ id: string}>}) {
  const { id } = await params;
  const postData = await getPostData(id);

  // 👇 조회수 로직 시작!
  let viewCount = 1;
  
  // 1. DB에서 현재 글(id)의 조회수를 가져옵니다.
  const { data } = await supabase.from('views').select('count').eq('slug', id).single();

  if (data) {
    // 2. 기록이 있으면 기존 조회수에 +1을 합니다.
    viewCount = data.count + 1;
    await supabase.from('views').update({ count: viewCount }).eq('slug', id);
  } else {
    // 3. 기록이 없으면(처음 읽는 글이면) 조회수 1로 새로 만듭니다.
    await supabase.from('views').insert({ slug: id, count: 1 });
  }
  // 👆 조회수 로직 끝!

  return (
    <main className="max-w-3xl mx-auto px-8 py-16">
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        
        {/* 👇 날짜 옆에 조회수(viewCount)를 예쁘게 띄워줍니다! */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
          <time>{postData.date}</time>
          <span>·</span>
          <span> {viewCount} views</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      
      <Comments />
    </main>
  );
}
