import ArticleDetail from "./_components/ArticleDetail";
import Link from "next/link";
import CommentSection from "./_components/CommentSection";

export default function Page() {
  return (
    <div>
      <ArticleDetail />
      <CommentSection />
      <div className="mt-[48px] flex justify-center">
        <Link href="/boards">
          <button className="bg-brand-blue text-cool-gray-100 cursor-pointer rounded-[40px] border-none px-[64px] py-[12px]">
            목록으로 돌아가기 ↩
          </button>
        </Link>
      </div>
    </div>
  );
}
