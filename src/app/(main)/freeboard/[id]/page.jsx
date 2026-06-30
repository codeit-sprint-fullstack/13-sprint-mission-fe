import { getArticle } from "@/api/articles";
import { getComments } from "@/api/articlesComments";
import PostDetail from "../_components/PostDetail";
import CommentsSection from "../_components/CommentsSection";
import Image from "next/image";
import Link from "next/link";

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  const [post, commentData] = await Promise.all([
    getArticle(id),
    getComments(id),
  ]);

  return (
    <div className="flex flex-col gap-6 pr-4">
      <PostDetail post={post} />

      <CommentsSection
        initialComments={commentData.list ?? []}
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
