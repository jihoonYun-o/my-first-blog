import { MetadataRoute } from "next";
import { getSortedPostsData } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPostsData();
    const baseUrl = "https://my-first-blog-virid.vercel.app";

    // 블로그 글의 주소를 지도에 추가
    const postUrls = posts.map((post ) => ({
        url: `${baseUrl}/posts/${post.id}`,
        lastModified: new Date(post.date),
    
    }));
    return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}