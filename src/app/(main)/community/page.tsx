import Button from "@/components/common/Button";
import BestCard from "@/components/ui/BestCard";
import PostsCard from "@/components/ui/PostsCard";
import SearchInput from "@/components/ui/SeartchInput";
import SortDropDown from "@/components/ui/SortDropDown";
import { getBestPosts, getPosts } from "@/lib/PostAPI";
import Link from "next/link";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ orderBy?: string; keyword?: string }>;
}) {
  const params = await searchParams;
  const orderBy = params?.orderBy ?? "recent";
  const keyword = params.keyword ?? "";
  const [bestPosts, posts] = await Promise.all([
    getBestPosts(),
    getPosts(orderBy, keyword),
  ]);

  return (
    <div className="page-container mt-6 mb-73.25 bg-white">
      <section>
        <div className="text-black font-bold text-[20px] mb-6 ">
          베스트 게시글
        </div>

        {/* 베스트 게시글  BestCard ui 로 표현*/}
        <div className="mb-10 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
          {bestPosts.map((best, index) => (
            <div
              key={best.id}
              // 반응형 태블릿 2개 모바일 1개
              className={
                index === 0
                  ? "block"
                  : index === 1
                    ? "hidden tablet:block"
                    : "hidden desktop:block"
              }
            >
              <BestCard post={best} />
            </div>
          ))}
        </div>
      </section>

      {/* 게시글 및 글쓰기 */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-900 text-[24px] tablet:text-[20px] font-bold">
          게시글
        </p>
        <Link href="/community/post">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {/* 검색 및 정렬 */}
      <div className="flex justify-between mb-6 gap-4 items-center">
        <SearchInput defaultValue={keyword} />
        <SortDropDown current={orderBy} />
      </div>

      {/* 정렬 된 게시글 */}
      <div className="mb-10 grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
