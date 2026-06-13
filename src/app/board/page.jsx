import Button from "@/components/ui/Button";
import PopularPostCard from "@/components/ui/PopularPostCard";

import { mockPosts } from "@/mocks/posts";

export default function BoardListPage() {
  return (
    <div className="p-[20px] flex-1 min-desktop:m-auto">
      <section className="mb-[24px]">
        <h1 className="text-secondary-900 text-[20px] font-bold mb-[24px]">
          베스트 게시글
        </h1>
        <div className="flex gap-[24px]">
          {mockPosts.slice(0, 3).map((bestPost, index) => (
            <PopularPostCard key={index} data={bestPost} />
          ))}
        </div>
      </section>
      <section>
        <header className="flex justify-between">
          <h1 className="text-secondary-900 text-[20px] font-bold">게시글</h1>
          <Button variant="rectangle" className="bg-primary text-white">
            글쓰기
          </Button>
        </header>
      </section>
    </div>
  );
}
