"use client";

import { useState } from "react";
import Avatar from "@/components/common/Avatar";
import { formatTimeAgo } from "@/lib/formatDate";
import KebabMenu from "@/components/common/KebabMenu";
import { updateComment, deleteComment } from "@/lib/api";
import type { Comment } from "@/types/api";
import { getErrorMessage } from "@/lib/errors";

interface CommentItemProps {
  comment: Comment;
  onUpdate: (comment: Comment) => void;
  onRemove: (id: number) => void;
}

// 댓글 한 개. 보기 <-> 인라인 편집 두 모드를 가져 client로 둔다.
export default function CommentItem({
  comment,
  onUpdate,
  onRemove,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate(formData: FormData) {
    // formData.get은 FormDataEntryValue | null이라 문자열인지 확인 후 trim
    const value = formData.get("content");
    const content = typeof value === "string" ? value.trim() : "";
    if (!content) return;
    try {
      const updated = await updateComment(comment.id, content);
      onUpdate(updated); // 부모 state 교체 -> 즉시 반영
      setIsEditing(false);
    } catch (err) {
      alert(getErrorMessage(err, "댓글 수정에 실패했어요."));
    }
  }

  async function handleDelete() {
    try {
      await deleteComment(comment.id);
      onRemove(comment.id); // 부모 state에서 제거
    } catch (err) {
      alert(getErrorMessage(err, "댓글 삭제에 실패했어요."));
    }
  }

  return (
    <li className="border-b border-gray-200 py-6">
      <form action={handleUpdate}>
        {/* 본문: 보기=<p> / 편집=<textarea> */}
        <div className="flex items-start justify-between">
          {isEditing ? (
            <textarea
              name="content"
              defaultValue={comment.content}
              className="h-24 w-full resize-none rounded-lg bg-gray-100 px-6 py-4 text-base text-gray-800"
            />
          ) : (
            <p className="whitespace-pre-wrap text-base text-gray-800">
              {comment.content}
            </p>
          )}

          {/* 보기 모드에서만 케밥 */}
          {!isEditing && (
            <KebabMenu>
              <li>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 hover:bg-gray-50"
                >
                  수정하기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 hover:bg-gray-50"
                >
                  삭제하기
                </button>
              </li>
            </KebabMenu>
          )}
        </div>

        {/* 작성자 정보 줄 (항상 표시) + 편집 모드일 때 취소/수정완료 */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Avatar size={32} />
            <div className="flex flex-col">
              <span className="text-gray-600">{comment.writer?.nickname}</span>
              <span className="text-xs" suppressHydrationWarning>
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-9 rounded-lg px-4 text-sm text-gray-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="h-9 rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white"
              >
                수정 완료
              </button>
            </div>
          )}
        </div>
      </form>
    </li>
  );
}
