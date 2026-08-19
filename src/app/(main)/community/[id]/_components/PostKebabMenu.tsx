// _components/PostKebabMenu.jsx
"use client";

import { deletePost } from "@/lib/PostAPI";
import { useRouter } from "next/navigation";
import KebabMenu from "@/components/comments/KebabMenu";

export default function PostKebabMenu({ postId }: { postId: string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/community/${postId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      await deletePost(postId);
      router.push("/community");
    } catch (err) {
      alert(err instanceof Error ? err.message : "삭제에 실패했습니다");
    }
  };

  return <KebabMenu onEdit={handleEdit} onDelete={handleDelete} />;
}
