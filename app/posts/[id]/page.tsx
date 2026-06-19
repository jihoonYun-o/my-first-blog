import { getPostData } from "../../../lib/posts";
import Comments from "../../../components/Comments";
// params id에는 클릭한 글의 파일 이름이 들어옴
export default async function Post({ params }: { params: Promise<{ id: string}>}) {
    const { id } = await params;    
    const postData = await getPostData(id);

    return(
        <main className="max-w-3xl mx-auto px-8 py-16">
            <article className="prose lg:prose-xl">
                <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
                <p className="text-gray-500 mb-8">{postData.date}</p>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}>
                
                </div>
            </article>
            <Comments></Comments>
        </main>
    );
}