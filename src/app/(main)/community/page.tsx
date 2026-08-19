import PostCard from "./_components/PostCard";
import PostList from "./_components/PostList";
import CommunityFilters from "./_components/CommunityFilters";
import * as postService from "@/services/postService";
import Link from "next/link";
import { ROUTES } from "@/constants/navigation";

interface CommunityProps {
  searchParams: Promise<{ orderBy?: string; keyword?: string }>;
}

export default async function Community({ searchParams }: CommunityProps) {
  const resolvedSearchParams = await searchParams;

  const currentOrderBy = resolvedSearchParams?.orderBy || "recent";
  const currentKeyword = resolvedSearchParams?.keyword || "";

  const bestPostsRes = await postService.getPostList({
    orderBy: "like",
    pageSize: 3,
  });
  const bestPosts = bestPostsRes?.list || [];

  const recentPostsRes = await postService.getPostList({
    orderBy: currentOrderBy,
    pageSize: 4,
    keyword: currentKeyword,
  });
  const recentPosts = recentPostsRes?.list || [];

  return (
    <div className="text-secondary-800 mx-auto my-0 mt-[1.62rem] mb-[49.63rem] flex w-full max-w-300 flex-col gap-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[1.25rem] leading-8 font-bold">베스트 게시글</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {bestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-secondary-800 text-[1.25rem] leading-8 font-bold">
            게시글
          </h2>
          <Link href={ROUTES.COMMUNITY.REGISTER} className="btn" type="button">
            글쓰기
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <CommunityFilters
            currentKeyword={currentKeyword}
            currentOrderBy={currentOrderBy}
          />
          <div className="grid grid-rows-1 gap-6">
            {recentPosts.map((post) => (
              <PostList key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
