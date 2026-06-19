import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// posts 폴더의 경로를 찾아줌
const postsDirectory = path.join(process.cwd(), "posts");

// 모든 블로그 글의 데이터를가져와서 날짜 순으로 정렬 
export function getSortedPostsData() {
    // posts 폴더 안에 있는 파일 이름들을 가져옴
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // .md를없애서 고유 아이디를 만듦
        const id = fileName.replace(/\.md$/,"");

        // 마크다운 파일을 텍스트로 읽음
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // gray-matter를 사용하여 파싱
        const matterResult = matter(fileContents);

        // id와 데이터를합쳐서 반환
        return {
            id, 
            ...(matterResult.data as {title: string; date: string; description: string}),
        };
    });
    // 날짜를 기준으로 최신 글이 위로 오도록 정렬
    return allPostsData.sort((a,b)=> {
        if(a.date <b.date) {
            return 1; 
        } else {
            return -1;
        }
    });

}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // matter로제목, 날짜, 본문을 분리
    const matterResult = matter(fileContents);
    // remark로 마크다운 본문을 HTML로 전환
    const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as {title: string; date: string; description: string}),
    };
}