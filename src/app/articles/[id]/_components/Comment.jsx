import KebabMenu from "@/app/articles/[id]/_components/KebabMenu.jsx";
import clsx from "clsx";
import Image from "next/image.js";
import profileIcon from "@/asset/icon/ic_profile.png";
import TimeAgo from "@/app/articles/[id]/_components/TimeAgo.jsx";
import { useState } from "react";
import TextField from "@/components/common/TextField.jsx";

export default function Comment({
  className = "",
  content = "",
  id = "",
  createdAt = "",
  onEdit = () => {},
  onDelete = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  const editValid = editValue.trim().length >= 1 && editValue.length <= 100;

  const handleSave = async () => {
    if (!editValid) return;
    await onEdit({ commentId: id, content: editValue });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(
        "pb-2 md:pb-3 border-b-[1.4px] border-secondary-gray-200",
        className,
      )}
    >
      <div className={clsx("flex mb-6")}>
        {isEditing ? (
          // 편집 모드: input + 저장/취소
          <div className={clsx("flex-1")}>
            <div className={clsx("flex gap-2 justify-end text-500-14")}>
              <button
                className={clsx(editValid && "cursor-pointer")}
                onClick={handleSave}
                disabled={!editValid}
              >
                저장
              </button>
              <button className={clsx("cursor-pointer")} onClick={handleCancel}>
                취소
              </button>
            </div>
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              variant="editComment"
              placeholder="수정할 내용을 입력해주세요"
              isError={!editValid}
              errorMessage={
                !editValid ? "*댓글은 1자 이상 100자 이하여야 합니다" : ""
              }
            />
          </div>
        ) : (
          // 일반 모드: 기존 그대로 + 케밥
          <>
            <span className={clsx("mr-1 text-400-14 text-secondary-gray-800")}>
              {content}
            </span>
            <KebabMenu
              className={clsx("ml-auto")}
              onEdit={() => setIsEditing(true)} // 수정 누르면 편집 모드 진입
              onDelete={() => onDelete(id)} // 삭제 시 이 댓글 id를 넘김
            />
          </>
        )}
      </div>
      <div className={clsx("flex gap-2")}>
        <Image
          className={clsx("w-8 h-8")}
          src={profileIcon}
          alt="프로필 아이콘"
        />
        <div className={clsx("flex flex-col gap-1")}>
          <span className={clsx("text-400-12 text-secondary-gray-600")}>
            {id}
          </span>
          <TimeAgo
            className="text-400-12 text-secondary-gray-400"
            createdAt={createdAt}
          />
        </div>
      </div>
    </div>
  );
}
