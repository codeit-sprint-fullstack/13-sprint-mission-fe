import { getBestArticles } from "@/app/api/articles";
import Image from "next/image";
import Link from "next/link";

export default async function BestArticles() {
  const BestArticles = await getBestArticles();

  return (
    <section
      className="mt-[24px] flex flex-col gap-[24px]"
      aria-label="베스트 게시글"
    >
      <h1 className="text-cool-gray-900 text-[20px] font-bold">
        베스트 게시글
      </h1>
      <ul className="grid h-[170px] grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
        {BestArticles.data.map((article, index) => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <li
              className={`bg-cool-gray-50 flex flex-col gap-[20px] rounded-[8px] px-[24px] pb-[16px] ${(index === 1 && "hidden md:flex") || (index === 2 && "hidden lg:flex")}`}
            >
              <span className="bg-brand-blue flex w-[102px] justify-center rounded-b-[16px] px-[24px] py-[2px] text-[16px] font-bold whitespace-nowrap text-[#FFF]">
                🏆 Best
              </span>
              <div className="flex h-[72px] justify-between gap-[8px]">
                <p className="text-secondary-800 text-[20px] font-[600]">
                  {article.title}
                </p>
                <Image
                  src="/default_img.jpg"
                  alt="디폴트 이미지"
                  width={72}
                  height={72}
                />
              </div>
              <div className="flex justify-between">
                <span className="flex gap-[8px]">
                  <p className="text-secondary-600">{article.userName}</p>
                  <p className="text-secondary-600">❤ {article.favorite}</p>
                </span>
                <p className="text-secondary-400">
                  {article.createdAt.slice(0, 10)}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
