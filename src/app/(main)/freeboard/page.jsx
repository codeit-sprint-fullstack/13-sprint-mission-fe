import PostList from "./_components/PostList";
import SearchBar from "./_components/searchBar";
import BestPostList from "./_components/BestPostList";
import Link from "next/link";

// 자유게시판 페이지 - 베스트 게시글 섹션과 일반 게시글 섹션으로 구성
export default async function Freedoard({ searchParams }) {
  const { keyword = "", orderBy = "recent" } = await searchParams;

  const [bestRes, listRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?page=1&pageSize=3`),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?keyword=${keyword}&orderBy=${orderBy}&page=1&pageSize=10`,
    ),
  ]);
  const bestData = await bestRes.json();
  const listData = await listRes.json();

  return (
    <div>
      {/* 베스트 게시글 섹션 */}
      <section>
        <h2 className="text-2lg mb-4 font-bold text-gray-900 md:mb-6 md:text-xl">
          베스트 게시글
        </h2>
        <BestPostList posts={bestData.list} />
      </section>

      {/* 일반 게시글 섹션 - 검색/정렬 기능 포함 */}
      <section>
        <div className="mt-6 flex items-center justify-between self-stretch lg:mt-10">
          <h2 className="text-2lg font-bold text-gray-800 md:text-xl">
            게시글
          </h2>
          <Link href="/freeboard/write">
            <button className="btn_small_40">글쓰기</button>
          </Link>
        </div>
        <div className="my-4 md:my-12 xl:my-6">
          <SearchBar keyword={keyword} orderBy={orderBy} />
        </div>
        {/* 고정 높이 + 스크롤로 게시글 목록 표시 */}
        <div className="h-165 overflow-y-auto md:h-179 xl:h-169">
          <PostList posts={listData.list} />
        </div>
      </section>
    </div>
  );
}
