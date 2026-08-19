"use client";

import { useRouter } from "next/navigation";
import KebabDropdown from "./KebabDropdown";
import { deletePost } from "@/services/postService";
import { ROUTES } from "@/constants/navigation";
import { Post } from "@/types";

interface PostDropDownProps {
  postId: Post["id"];
}

export default function PostDropDown({ postId }: PostDropDownProps) {
  const router = useRouter();

  function handleEdit() {
    router.push(ROUTES.COMMUNITY.EDIT(postId));
  }

  const handleDelete = async () => {
    if (!confirm("게시글을 정말 삭제하시겠습니까?")) return;

    try {
      await deletePost(postId);
      alert("게시글이 삭제되었습니다.");

      router.push(ROUTES.COMMUNITY.BASE);
      router.refresh();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return <KebabDropdown onEdit={handleEdit} onDelete={handleDelete} />;
}
