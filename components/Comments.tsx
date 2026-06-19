"use client";

import Giscus from "@giscus/react";

export default function Comments() {
    return(
        <div className="mt-20">
            <Giscus
                id="comments"
                repo="jihoonYun-o/my-blog"
                repoId=""
                category="Announcements"
                categoryId=""
                mapping="pathname"
                term="Welcome to @giscus/react component"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="ko"
                loading="lazy" />
        </div>
    );
}