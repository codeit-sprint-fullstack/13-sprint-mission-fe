"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";
import { formatAgo } from "@/app/lib/timeago";
import {
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
} from "@/app/lib/api";
import KebabMenu from "@/app/components/ui/KebabMenu";

const PROFILE_ICON = "/icons/ic_profile.svg";
const EMPTY_COMMENT_IMG = "/images/Img_items_detail.svg";

export default function CommentSection({ productId, initialComments }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState("");
  const { data: commentsData } = useQuery({
    queryKey: ["product-comments", productId],
    queryFn: () => getProductComments(productId),
    initialData: { list: initialComments },
  });
  const comments = commentsData?.list ?? [];

  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleCreateComment = async () => {
    if (!commentInput.trim()) return;
    setSubmittingComment(true);
    try {
      await createProductComment(productId, commentInput);
      setCommentInput("");
      queryClient.invalidateQueries({
        queryKey: ["product-comments", productId],
      });
    } finally {
      setSubmittingComment(false);
    }
  };
  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;
    await updateProductComment(commentId, editContent);
    setEditingId(null);
    queryClient.invalidateQueries({
      queryKey: ["product-comments", productId],
    });
  };

  const handleDeleteComment = async (commentId) => {
    await deleteProductComment(commentId);
    queryClient.invalidateQueries({
      queryKey: ["product-comments", productId],
    });
  };

  const handleStartEditComment = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-sm font-bold text-secondary-900 mb-3">문의하기</h2>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          rows={4}
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreateComment}
            disabled={!commentInput.trim() || submittingComment}
            className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary disabled:cursor-not-allowed"
          >
            {submittingComment ? "등록 중..." : "등록"}
          </button>
        </div>
      </section>

      {/* 댓글 목록 */}
      <section className="mb-12">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <Image
              src={EMPTY_COMMENT_IMG}
              alt="문의 없음"
              width={120}
              height={120}
            />
            <p className="text-sm text-secondary-400 mt-2">
              아직 문의가 없어요
            </p>
          </div>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="py-5 border-b border-secondary-100"
              >
                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary transition mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 text-xs border border-secondary-200 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={!editContent.trim()}
                        className="px-4 py-1.5 text-xs bg-primary text-white rounded-lg disabled:bg-secondary-400 transition-colors"
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm text-secondary-800 flex-1">
                        {comment.content}
                      </p>
                      {comment.writer?.id === user?.id && (
                        <KebabMenu
                          onEdit={() => handleStartEditComment(comment)}
                          onDelete={() => handleDeleteComment(comment.id)}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={comment.writer?.image ?? PROFILE_ICON}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-secondary-600">
                          {comment.writer?.nickname}
                        </span>
                        <span className="text-xs text-secondary-400">
                          {formatAgo(comment.createdAt, "ko")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
