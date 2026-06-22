"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import PostForm from "../PostForm";

import { boardService } from "@/lib/boardService";

export default function CreatePostPage() {
  const router = useRouter();
  const [data, setData] = useState({ title: "", content: "" });

  async function postArticle() {
    // 회원가입이 없는 이유로 임의로 userId 1로 해두기
    const result = await boardService.postArticle({ ...data, userId: 1 });
    router.push(`/board/${result.id}`);
  }

  return (
    <PostForm
      data={data}
      setData={setData}
      onSubmit={(e) => {
        e.preventDefault();
        postArticle();
      }}
    />
  );
}
