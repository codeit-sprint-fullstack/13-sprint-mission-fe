"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/services/articleService";
import { deleteArticle } from "@/app/boards/[id]/actions";
import KebabMenu from "./KebabMenu";
import DefaultProfile from "@/assets/png/ic_default_profile.png";

export default function ArticleSection({ article }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    await deleteArticle(article.id);
    router.push("/boards");
  };

  const menuOptions = [
    { label: "수정하기", onClick: () => router.push(`/boards/${article.id}/edit`) },
    { label: "삭제하기", onClick: handleDelete },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
      <div className="flex items-start justify-between gap-2">
        <h1 className="font-bold text-lg leading-snug">{article.title}</h1>
        <KebabMenu options={menuOptions} />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Image src={DefaultProfile} alt="프로필" width={24} height={24} className="rounded-full w-6 h-6 shrink-0" />
        <span>{article.writer?.nickname || "판다마켓"}</span>
        <span className="text-gray-300">|</span>
        <span>{formatDate(article.createdAt)}</span>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{article.content}</p>
    </div>
  );
}
