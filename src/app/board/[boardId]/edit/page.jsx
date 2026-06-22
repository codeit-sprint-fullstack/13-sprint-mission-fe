"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import PostForm from "../../PostForm";
import { boardService } from "@/lib/boardService";

export default function EditPostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const boardId = pathname.split("/")[2];
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  async function getArticle() {
    const { title, content } = await boardService.getArticleDetail(boardId);
    setData({ title, content });
  }
  async function patchArticle() {
    // 회원가입이 없는 이유로 임의로 userId 1로 해두기
    const result = await boardService.patchArticle(boardId, data);
    router.push(`/board/${result.id}`);
  }

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <PostForm
      data={data}
      setData={setData}
      onSubmit={(e) => {
        e.preventDefault();
        patchArticle();
      }}
    />
  );
}
