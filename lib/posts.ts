import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// 👇 env 안 쓰고 열쇠와 주소를 직접 넣었습니다!
const notion = new Client({ auth: "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" });
const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = "385b8e7c3bb880ac906c000b3a20d5ab";

export async function getSortedPostsData() {
  // 최신 노션 API (dataSources) 적용
  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((page: any) => {
    return {
      id: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      title: page.properties.이름?.title[0]?.plain_text || "제목 없음",
      date: page.properties.Date?.date?.start || "",
      description: page.properties.Description?.rich_text[0]?.plain_text || "",
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    };
  });
}

export async function getPostData(id: string) {
  // 최신 노션 API (dataSources) 적용
  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: { property: "Slug", rich_text: { equals: id } },
  });

  const page = response.results[0] as any;
  if (!page) throw new Error("글을 찾을 수 없습니다.");

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  const markdownContent = mdString.parent || "";

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdownContent);

  return {
    id,
    contentHtml: processedContent.toString(),
    title: page.properties.이름?.title[0]?.plain_text || "제목 없음",
    date: page.properties.Date?.date?.start || "",
    description: page.properties.Description?.rich_text[0]?.plain_text || "",
    tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
  };
}
