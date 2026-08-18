import BestCard from "@/components/BestCard";
import Card from "@/components/Card";
import DropDown from "@/components/common/DropDown";
import Input from "@/components/common/Input";
import { marketAPI } from "@/lib/services/marketApi";
import Link from "next/link";

export default async function ComuunityPage() {
  const articles: ArticleResponse | undefined = await marketAPI.getArticle();
  return (
    <div className="flex gap-[2.5rem] flex-col items-start max-w-[75rem] mt-[1.5rem] mx-auto">
      <section className="flex flex-col gap-[1.5rem] items-start self-stretch">
        <h2 className="font-pretendard text-[1.25rem] font-[700] leading-normal text-[#111827]">
          베스트 게시글
        </h2>
        <div className="grid grid-cols-3 gap-[1.5rem] items-start">
          {articles?.list.map((best) => (
            <BestCard
              title={best.title}
              date={best.createdAt}
              key={best.id}
              id={best.id}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col items-start gap-[1.5rem] self-stretch">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-pretendard text-[1.25rem] font-[700] leading-[2rem] text-[#1F2937]">
            게시글
          </h2>
          <Link
            href={"/community/create"}
            className="rounded-lg bg-[#3692FF] h-10.5 px-[1.44rem]"
          >
            <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
              글쓰기
            </span>
          </Link>
        </div>
        <div className="flex items-start justify-between w-full">
          <Input />
          <DropDown />
        </div>
        <div className="flex w-full gap-[1.5rem] flex-col">
          {articles?.list.map((item) => (
            <Card
              title={item.title}
              date={item.createdAt}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
