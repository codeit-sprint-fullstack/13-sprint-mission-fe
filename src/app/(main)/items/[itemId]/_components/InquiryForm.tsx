"use client";

import { ErrorResponse } from "@/types/api";
import { ProductComment } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

type InquiryFormParams = {
  itemId: string;
};

export default function InquiryForm() {
  const { itemId } = useParams<InquiryFormParams>();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>("");
  const { mutate, isPending } = useMutation<
    void,
    Error,
    { content: ProductComment["content"] }
  >({
    mutationFn: async (data) => {
      try {
        const res = await fetch(
          `https://panda-market-api.vercel.app/products/${itemId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
          },
        );
        if (!res.ok) {
          const errorData: ErrorResponse = await res.json();
          throw new Error(errorData.message);
        }
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
      setComment("");
    },
  });

  return (
    <form
      className="mt-[40px] flex flex-col gap-[9px]"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ content: comment });
      }}
    >
      <label
        htmlFor="inquireForm"
        className="text-cool-gray-900 text-[16px] font-[600]"
      >
        문의하기
      </label>
      <textarea
        id="inquireForm"
        className="bg-cool-gray-100 h-[104px] resize-none rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="flex justify-end">
        <button
          className="text-cool-gray-100 bg-brand-blue disabled:bg-secondary-400 disabled:bg-secondary-400 cursor-pointer rounded-[8px] border-none px-[23px] py-[12px] text-[16px] font-[600] disabled:cursor-not-allowed"
          disabled={isPending}
        >
          등록
        </button>
      </div>
    </form>
  );
}
