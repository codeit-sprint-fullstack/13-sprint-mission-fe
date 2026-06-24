import BestPostCard from "./BestPostCard";

// 베스트 게시글 목록 - page에서 받은 posts를 화면 크기에 따라 1~3개 표시
export default function BestPostList({ posts }) {
  return (
    // 반응형 그리드: 모바일 1열 / 태블릿 2열 / 데스크탑 3열
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        // 화면 크기에 따라 카드 노출 개수 조절 (index 0: 항상, 1: md 이상, 2: xl 이상)
        <div
          key={post.id}
          className={` ${index === 0 ? "block" : ""} ${index === 1 ? "hidden md:block" : ""} ${index === 2 ? "hidden xl:block" : ""} `}
        >
          <BestPostCard post={post} />
        </div>
      ))}
    </div>
  );
}
