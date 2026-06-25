"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import PostForm from "../PostForm";

import { boardService } from "@/lib/boardService";

export default function CreatePostPage() {
  const router = useRouter();
  const [data, setData] = useState({ title: "", content: "" });
  const { mutate: postArticle } = useMutation({
    mutationKey: ["board", "create"],
    mutationFn: boardService.postArticle,
    onSuccess: (result) => {
      router.push(`/board/${result.id}`);
    },
  });

  return (
    <PostForm
      data={data}
      setData={setData}
      onSubmit={(e) => {
        e.preventDefault();
        postArticle({
          ...data,
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
        });
      }}
    />
  );
}
