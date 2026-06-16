import React from "react";
import BestCard from "./components/BsetCard";

const BEST_POSTS = [
  {
    id: 1,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    author: "총명한판다",
    likeCount: 12300,
    date: "2024. 04. 16",
    image: null,
  },
];

export default function FreeBoardsPage() {
  return (
    <main className="mx-4 mt-4">
      <h2 className="font-bold text-[1.125rem]">베스트 게시글</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {BEST_POSTS.map((post) => (
          <BestCard
            key={post.id}
            title={post.title}
            author={post.author}
            likeCount={post.likeCount}
            date={post.date}
            image={post.image}
          />
        ))}
      </div>
    </main>
  );
}
