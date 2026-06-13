import Button from "@/components/ui/Button";

export default function BoardListPage() {
  return (
    <div className="p-[20px] flex-1">
      <section className="mb-[24px]">
        <h1 className="text-secondary-900 text-[20px] font-bold">
          베스트 게시글
        </h1>
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
