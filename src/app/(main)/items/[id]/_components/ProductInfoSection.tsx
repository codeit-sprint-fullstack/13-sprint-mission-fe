"use client";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import KebabMenu from "@/components/comments/KebabMenu";
import type { EditForm } from "./useProductEdit";

export default function ProductInfoSection({
  name,
  price,
  description,
  tags,
  isEditing,
  editForm,
  setEditForm,
  isOwner,
  onEdit,
  onDelete,
  ownerNickname,
  date,
  isLiked,
  favoriteCount,
  onToggleFavorite,
  onCancelEdit,
  onSave,
  isUpdating,
}: {
  name: string;
  price: number;
  description: string;
  tags: string[];
  isEditing: boolean;
  editForm: EditForm | null;
  setEditForm: Dispatch<SetStateAction<EditForm | null>>;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  ownerNickname: string;
  date: string;
  isLiked: boolean;
  favoriteCount: number;
  onToggleFavorite: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  isUpdating: boolean;
}) {
  return (
    <article className="flex-1">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <input
            value={editForm!.name}
            onChange={(e) =>
              setEditForm((f) => ({ ...f!, name: e.target.value }))
            }
            className="font-semibold text-2xl border-b border-gray-300 focus:outline-none w-full mr-4"
          />
        ) : (
          <h1 className="font-semibold text-2xl">{name}</h1>
        )}
        {isOwner && <KebabMenu onEdit={onEdit} onDelete={onDelete} />}
      </div>

      {isEditing ? (
        <div className="flex items-baseline pb-4 border-b border-gray-300">
          <input
            type="text"
            value={editForm!.price}
            onChange={(e) =>
              setEditForm((f) => ({ ...f!, price: Number(e.target.value) }))
            }
            size={String(editForm!.price).length || 1}
            className="font-semibold text-[50px] focus:outline-none"
          />
          <span className="font-semibold text-[50px]">원</span>
        </div>
      ) : (
        <p className="font-semibold text-[50px] pb-4 mb-10">
          {price.toLocaleString()}원
        </p>
      )}

      <h2 className="font-semibold text-[16px]">상품 소개</h2>
      {isEditing ? (
        <textarea
          value={editForm!.description}
          onChange={(e) =>
            setEditForm((f) => ({ ...f!, description: e.target.value }))
          }
          className="w-full mt-4 mb-6 bg-gray-100 rounded-xl px-4 py-3 resize-none focus:outline-none"
          rows={4}
        />
      ) : (
        <p className="font-normal text-[16px] mt-4 mb-6 text-gray-600">
          {description}
        </p>
      )}

      <h3 className="mb-4">상품 태그</h3>
      <div>
        {(isEditing ? editForm!.tags : tags).map((t) => (
          <span key={t} className="mr-2 px-4 py-1.5 bg-gray-100 rounded-3xl">
            #{t}
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-15.5">
        <article className="flex gap-4 items-center">
          <Image
            src="/images/ic_profile.png"
            alt="프로필 사진"
            width={40}
            height={40}
          />
          <div>
            <p>{ownerNickname}</p>
            <p>{date}</p>
          </div>
        </article>
        <button
          onClick={onToggleFavorite}
          className={`flex items-center gap-1 px-4 py-2 rounded-full border cursor-pointer ${
            isLiked
              ? "border-error-red text-error-red"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {isLiked ? "♥" : "♡"} {favoriteCount}
        </button>
      </div>

      {isEditing && (
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onCancelEdit}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onSave}
            disabled={isUpdating}
            className="px-6 py-2 bg-primary-100 text-white rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isUpdating ? "저장 중..." : "수정 완료"}
          </button>
        </div>
      )}
    </article>
  );
}
