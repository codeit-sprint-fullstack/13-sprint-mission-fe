import Link from "next/link";
import BestCard from "./_components/BsetCard";
import PostCard from "./_components/PostCard";
import SortDropdown from "./_components/SortDropdown";
import SearchInput from "./_components/SearchInput";
import {
  getBestArticles,
  getArticles,
  formatDate,
} from "@/services/articleService";
import DefaultImg from "@/assets/png/img_board_default.png";

export default async function FreeBoardsPage({ searchParams }) {
  const { orderBy = "recent", keyword = "" } = await searchParams;

  const [bestPosts, posts] = await Promise.all([
    getBestArticles(3),
    getArticles({ orderBy, keyword }),
  ]);

  return (
    <main className="px-4 md:px-6 lg:mx-90 py-4 md:py-6 lg:py-8">
      <h2 className="font-bold text-base md:text-lg lg:text-xl">
        베스트 게시글
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {bestPosts.map((post, index) => (
          <div
            key={post.id}
            className={["", "hidden md:block", "hidden lg:block"][index]}
          >
            <BestCard
              id={post.id}
              title={post.title}
              author={post.writer?.nickname || "판다마켓"}
              likeCount={post.favorite}
              date={formatDate(post.createdAt)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 md:mt-10 lg:mt-12">
        <h2 className="font-bold text-base md:text-lg lg:text-xl">게시글</h2>
        <Link
          href="/boards/create"
          className="bg-primary-100 hover:bg-primary-200 text-white font-medium px-4 md:px-5 lg:px-5 py-2 md:py-2.5 lg:py-2.5 rounded-lg transition-colors text-sm md:text-sm lg:text-base"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <SearchInput />
        <SortDropdown />
      </div>

      <div className="flex flex-col mt-2 mb-16 md:mb-20 lg:mb-28">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.writer?.nickname || "판다마켓"}
            likeCount={post.favorite}
            date={formatDate(post.createdAt)}
            image={DefaultImg}
          />
        ))}
      </div>
    </main>
  );
}
