"use client";
import { useState } from "react";

import PostForm from "../_components/PostForm";

import useBoardMutations from "../_hooks/useBoardMutations";
import { PostType } from "@/types/post";

export default function CreatePostPage() {
  const [data, setData] = useState<Pick<PostType, "title" | "content">>({
    title: "",
    content: "",
  });
  const { postPostMutation } = useBoardMutations({});

  return (
    <PostForm
      data={data}
      setData={setData}
      onSubmit={(e) => {
        e.preventDefault();
        postPostMutation.mutate({
          ...data,
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
        });
      }}
    />
  );
}
