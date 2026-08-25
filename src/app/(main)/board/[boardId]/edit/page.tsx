"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PostForm from "../../_components/PostForm";
import useBoard from "../../_hooks/useBoard";
import useBoardMutations from "../../_hooks/useBoardMutations";

export default function EditPostPage() {
  const { boardId } = useParams();
  const { postDetail, isPostDetailPending } = useBoard({
    boardId: Number(boardId),
  });
  const { patchPostMutation } = useBoardMutations({ boardId: Number(boardId) });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!postDetail) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      title: postDetail.title ?? "",
      content: postDetail.content ?? "",
    });
  }, [postDetail]);

  return (
    <PostForm
      data={formData}
      setData={setFormData}
      onSubmit={(e) => {
        e.preventDefault();
        patchPostMutation.mutate({
          id: Number(boardId),
          data: {
            ...formData,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
          },
        });
      }}
    />
  );
}
