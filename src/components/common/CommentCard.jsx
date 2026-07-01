import React, { useState } from "react";
import KebabMenu from "./KebabMenu";
import Image from "next/image";
import ic_profile from "@/assets/icons/ic_profile.svg";
import { useAuth } from "@/providers/AuthProvider";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/lib/productService";

function formatRelativeTime(dateString) {
  if (!dateString) return "";

  const now = new Date();
  const updatedTime = new Date(dateString);

  // 두 시간의 차이 (밀리초 단위)
  const diffInMs = now - updatedTime;

  // 만약 미래의 시간이거나 컴퓨터 시간 꼬임으로 음수가 나오면 방어 처리
  if (diffInMs < 0) return "방금 전";

  // 분, 시간, 일 단위로 환산
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // 1. 1분 미만일 때
  if (diffInMins < 1) {
    return "방금 전";
  }

  // 2. 24시간 미만일 때 (몇 시간 전)
  if (diffInHours < 24) {
    // 60분 미만이면 '몇 분 전'으로 디테일을 살려주면 더 좋아요!
    if (diffInMins < 60) {
      return `${diffInMins}분 전`;
    }
    return `${diffInHours}시간 전`;
  }

  // 3. 24시간 이상일 때 (몇 일 전)
  return `${diffInDays}일 전`;
}

export default function CommentCard({ commentItem }) {
  const { id: productId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentItem?.content || "");
  const isCommentOwner =
    user && commentItem && user.id === commentItem.writer?.id;
  const updateMutation = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("accessToken");
      return productService.updateComment(commentItem.id, editContent, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("accessToken");
      return productService.deleteComment(commentItem.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(commentItem.content); // 원본 글로 롤백
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    updateMutation.mutate();
  };
  const handleDeleteClick = () => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };
  return (
    <div className="flex justify-between pb-3 border-b border-b-gray-300">
      <div className="flex flex-col gap-6 w-[315px] lg:w-full">
        {isEditing ? (
          <form
            onSubmit={handleUpdateSubmit}
            className="w-full flex flex-col gap-2 mt-2"
          >
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-gray-100 w-full h-24 p-3 rounded-xl resize-none text-md text-gray-800 border border-gray-200 focus:outline-none focus:border-primary-100"
            />
            <div className="flex gap-2 self-end">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-sm bg-primary-100 text-white rounded-lg cursor-pointer disabled:bg-gray-400"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!editContent.trim() || updateMutation.isPending}
                className="px-3 py-1.5 text-sm bg-primary-100 text-white rounded-lg cursor-pointer disabled:bg-gray-400"
              >
                수정완료
              </button>
            </div>
          </form>
        ) : (
          <p className="text-md text-gray-800">{commentItem.content}</p>
        )}

        <div className="flex gap-2 ">
          <Image alt="프로필 사진" src={ic_profile} width={32} height={32} />
          <div>
            <p className="text-xs text-gray-600">
              {commentItem.writer.nickname}
            </p>
            <p className="text-xs text-gray-400">
              {formatRelativeTime(commentItem.updatedAt)}
            </p>
          </div>
        </div>
      </div>
      {isCommentOwner && !isEditing && (
        <KebabMenu
          onEdit={() => setIsEditing(true)}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
}
