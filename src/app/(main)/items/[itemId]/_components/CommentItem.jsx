"use client";

import KebabMenu from "@/components/KebabMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CommentItem({ comment }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState(comment.content);
  const queryClient = useQueryClient();
  const { itemId } = useParams();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () =>
      await fetch(
        `https://panda-market-api.vercel.app/comments/${comment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await fetch(
          `https://panda-market-api.vercel.app/comments/${comment.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
          },
        );
        if (!res.ok) {
          const ErrorData = await res.json();
          throw new Error(ErrorData.message);
        }
      } catch (err) {
        alert(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
    },
  });

  const handleSelect = (value) => {
    if (value === "delete") deleteMutate();
    if (value === "update") setIsUpdate(true);
  };

  return (
    <li
      key={comment.id}
      className="border-cool-gray-200 mt-[40px] flex flex-col gap-[24px] border-b border-solid bg-[#FCFCFC] pb-[12px]"
    >
      {!isUpdate ? (
        <>
          <div>
            <div className="flex w-full justify-between">
              <p className="text-secondary-800 text-[14px] font-[400]">
                {comment.content}
              </p>
              <KebabMenu onSelect={handleSelect} />
            </div>
          </div>
          <div className="flex gap-[8px]">
            <Image
              src="/ic_profile.svg"
              alt="사용자 기본 프로필"
              width={32}
              height={32}
            />
            <div>
              <p className="text-secondary-600 text-[12px] font-[400]">
                {comment.writer.nickname}
              </p>
              <p className="text-secondary-400 text-[12px] font-[400]">
                {comment.createdAt.slice(0, 10)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col gap-[5px]">
          <textarea
            value={updateComment}
            className="bg-cool-gray-200 resize-none rounded-[8px] border-none px-[12px] py-[5px] focus:border"
            onChange={(e) => setUpdateComment(e.target.value)}
            autoFocus
          />
          <div className="flex gap-[8px]">
            <button
              className="bg-brand-blue text-cool-gray-200 cursor-pointer rounded-[8px] border-none px-[8px] py-[4px] text-[14px]"
              onClick={() => {
                updateMutate({ content: updateComment });
                setIsUpdate(false);
              }}
            >
              수정 완료
            </button>
            <button
              className="bg-brand-blue text-cool-gray-200 cursor-pointer rounded-[8px] border-none px-[8px] py-[4px] text-[14px]"
              onClick={() => setIsUpdate(false)}
            >
              수정 취소
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
