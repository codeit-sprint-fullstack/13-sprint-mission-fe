"use client";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { createPost } from "@/lib/PostAPI";
import { useAuth } from "@/providers/providers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !title.trim() || !content.trim() || isLoading;
  const router = useRouter();

  const handleSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await createPost({
        title,
        content,
        ownerId: user.id,
      });
      router.push("/community");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "등록에 실패했습니다!");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="게시글 등록 중..." />;
  }

  return (
    <div className="page-container mt-6">
      <div className="flex flex-col">
        <div className=" mb-8 flex justify-between">
          <h1 className="font-bold text-[20px] py-1.25">게시글 쓰기</h1>
          <Button onClick={handleSubmit} disabled={isDisabled}>
            등록
          </Button>
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="font-bold text-[18px]">*제목</h2>
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg px-6 py-4 bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[18px]">*내용</h3>
          <textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" w-full h-70.5 rounded-lg bg-gray-100
            px-6 py-4 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
