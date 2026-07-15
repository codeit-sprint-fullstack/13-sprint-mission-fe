"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteArticle, addArticleLike, removeArticleLike } from "@/api/articles";
import { getMe } from "@/api/user";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.$/, "");
};

export default function PostDetail({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(post?.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0);
  const [myId, setMyId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getMe().then((me) => setMyId(me?.id)).catch(() => {});
  }, []);

  const isOwner = myId && post?.owner?.id === myId;

  if (!post) return null;

  const handleDelete = async () => {
    await deleteArticle(post.id);
    router.push("/freeboard");
  };

  const handleLikeToggle = async () => {
    try {
      if (isFavorite) {
        await removeArticleLike(post.id);
        setIsFavorite(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await addArticleLike(post.id);
        setIsFavorite(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
        {isOwner && (
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
              <BsThreeDotsVertical size={24} className="text-gray-500" />
            </button>
            {isOpen && (
              <ul className="absolute right-0 z-50 mt-1 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
                <li
                  onClick={() => router.push(`/freeboard/${post.id}/edit`)}
                  className="cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                >
                  수정하기
                </li>
                <li
                  onClick={() => {
                    handleDelete();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                >
                  삭제하기
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <Image
            src={post.owner?.image || "/image/ic_profile.svg"}
            alt="프로필"
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <span className="text-md text-gray-600">
            {post.owner?.nickname ?? "판다"}
          </span>
          <span className="text-xs text-gray-400">
            {formatDate(post.createdAt)}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1"
          >
            {isFavorite ? (
              <AiFillHeart size={16} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={16} className="text-gray-400" />
            )}
            <span className="text-md text-gray-500">{likeCount}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-lg text-gray-800">{post.content}</p>
        {post.images?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {post.images.map((src, i) => (
              <div key={i} className="relative h-[168px] w-[168px] lg:h-[282px] lg:w-[282px]">
                <Image
                  src={src}
                  alt={`이미지-${i + 1}`}
                  fill
                  className="rounded-xl object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
