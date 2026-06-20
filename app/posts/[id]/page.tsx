import { getPostData } from "../../../lib/posts";
import Comments from "../../../components/Comments";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);
  return { title: postData.title, description: postData.description };
}

export default async function Post({ params }: { params: Promise<{ id: string}>}) {
  const { id } = await params;
  const postData = await getPostData(id);

  let viewCount = 1;
  
  const { data, error: selectError } = await supabase.from('views').select('count').eq('slug', id).single();

  if (data) {
    viewCount = data.count + 1;
    const { error: updateError } = await supabase.from('views').update({ count: viewCount }).eq('slug', id);
    if (updateError) console.log("❌ 업데이트 에러:", updateError);
  } else {
    const { error: insertError } = await supabase.from('views').insert({ slug: id, count: 1 });
    if (insertError) console.log("❌ 생성 에러:", insertError);
  }

  return (
    <main className="max-w-3xl mx-auto px-8 py-16">
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
          <time>{postData.date}</time>
          <span>·</span>
          <span>👀 {viewCount} views</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      
      <Comments />
    </main>
  );
}
