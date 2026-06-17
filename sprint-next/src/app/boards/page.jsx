import BestCard from "./components/BsetCard";
import PostCard from "./components/PostCard";
import SortDropdown from "./components/SortDropdown";
import SearchInput from "./components/SearchInput";
import { getBestArticles, getArticles, formatDate } from "@/services/articleService";
import DefaultImg from "@/assets/png/borad_default.png";

export default async function FreeBoardsPage({ searchParams }) {
  const { orderBy = "recent", keyword = "" } = await searchParams;

  const [bestPosts, posts] = await Promise.all([
    getBestArticles(3),
    getArticles({ orderBy, keyword }),
  ]);

  return (
    <main className="mx-4 mt-4">
      <h2 className="font-bold text-[1.125rem]">베스트 게시글</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {bestPosts.map((post, index) => (
          <div
            key={post.id}
            className={["", "hidden md:block", "hidden lg:block"][index]}
          >
            <BestCard
              title={post.title}
              author={"판다마켓"}
              likeCount={post.favorite}
              date={formatDate(post.createdAt)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <h2 className="font-bold text-[1.125rem]">게시글</h2>
        <button className="bg-primary-100 hover:bg-primary-200 text-white font-medium px-5 py-2 rounded-lg transition-colors">
          글쓰기
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <SearchInput />
        <SortDropdown />
      </div>

      <div className="flex flex-col mt-2 mb-[5.69rem] gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            author={"판다마켓"}
            likeCount={post.favorite}
            date={formatDate(post.createdAt)}
            image={DefaultImg}
          />
        ))}
      </div>
    </main>
  );
}
