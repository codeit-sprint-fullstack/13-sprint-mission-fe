"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tokenRequest } from "@/lib/api";

export default function ArticleKebab({ id, title }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await tokenRequest(`/articles/${id}`, { method: "DELETE" });
      router.push("/boards");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  return (
    <div className="flex items-start justify-between gap-2 relative">
      <h2 className="text-title-md text-gray-800 flex-1">{title}</h2>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Image src="/images/ic_kebab.svg" alt="더보기" width={24} height={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-[139px] z-10 flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button
            type="button"
            onClick={handleEdit}
            className="h-[46px] flex items-center justify-center text-body-md text-gray-500 hover:bg-gray-50 border-b border-gray-300"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-[46px] flex items-center justify-center text-body-md text-gray-500 hover:bg-gray-50"
          >
            삭제하기
          </button>
          {error && <p className="mt-4 text-red-500 text-body-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}
