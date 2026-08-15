"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { articleApi } from "@/entities/article";
import { useAuth } from "@/entities/user";
import { formatDate } from "@/shared/lib/formatDate";
import KebabMenu from "@/shared/ui/KebabMenu";
import AlertModal from "@/shared/ui/AlertModal";
import DefaultProfile from "@/assets/png/img_default_profile.png";

export default function ArticleSection({ articleId }: { articleId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const {
    data: article,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => articleApi.getArticle(articleId),
    staleTime: 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: () => articleApi.deleteArticle(articleId),
    onSuccess: () => router.push("/boards"),
  });

  const isOwner = article?.user.id === user?.id;

  const handleEdit = () => {
    if (!isOwner) {
      setShowPermissionModal(true);
      return;
    }
    router.push(`/boards/${articleId}/edit`);
  };

  const handleDelete = () => {
    if (!isOwner) {
      setShowPermissionModal(true);
      return;
    }
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    deleteMutation.mutate();
  };

  const menuOptions = [
    { label: "수정하기", onClick: handleEdit },
    { label: "삭제하기", onClick: handleDelete },
  ];

  if (isPending) return <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" />;
  if (isError)
    return <p className="text-center text-gray-500 py-10">게시글 정보를 불러오지 못했습니다.</p>;
  if (!article) return null;

  return (
    <>
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-start justify-between gap-2">
          <h1 className="font-bold text-lg leading-snug">{article.title}</h1>
          <KebabMenu options={menuOptions} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Image
            src={article.user.image ?? DefaultProfile}
            alt="프로필"
            width={24}
            height={24}
            className="rounded-full w-6 h-6 shrink-0 object-cover"
            unoptimized={!!article.user.image}
          />
          <span>{article.user.nickname}</span>
          <span className="text-gray-300">|</span>
          <span>{formatDate(article.createdAt)}</span>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </p>
      </div>

      {showPermissionModal && (
        <AlertModal
          message="본인이 작성한 게시글만 수정, 삭제할 수 있습니다."
          onClose={() => setShowPermissionModal(false)}
        />
      )}
    </>
  );
}
