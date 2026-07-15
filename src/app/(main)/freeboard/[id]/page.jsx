"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { fetchInstance } from "@/lib/fetchInstance";
import PostDetail from "../_components/PostDetail";
import CommentsSection from "../_components/CommentsSection";
import Image from "next/image";
import Link from "next/link";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/signin");
      return;
    }
    Promise.all([
      fetchInstance(`/articles/${id}`),
      fetchInstance(`/articles/${id}/comments?limit=10`),
    ])
      .then(([postData, commentData]) => {
        setPost(postData);
        setComments(commentData?.list ?? []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-10 text-center text-gray-400">불러오는 중...</p>;
  if (!post) return notFound();

  return (
    <div className="flex flex-col gap-6 pr-4">
      <PostDetail post={post} />

      <CommentsSection
        initialComments={comments}
        articleId={id}
      />

      <div className="mt-10 mb-10 flex justify-center md:mt-14 lg:mt-16">
        <Link href="/freeboard">
          <button className="flex h-12 w-60 items-center justify-center gap-2 rounded-full bg-blue-500 px-16 py-3 font-medium whitespace-nowrap text-white">
            목록으로 돌아가기
            <Image src="/image/ic_back.svg" alt="back" width={24} height={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}
