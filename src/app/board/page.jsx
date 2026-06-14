"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PopularPostCard from "@/components/ui/PopularPostCard";

import { mockPosts } from "@/mocks/posts";
import "swiper/css";

export default function BoardListPage() {
  return (
    <div className="p-[20px] flex-1 min-desktop:m-auto">
      <section className="mb-[24px]">
        <h1 className="text-secondary-900 text-[20px] font-bold mb-[24px]">
          베스트 게시글
        </h1>
        <Swiper slidesPerView="auto" spaceBetween={24}>
          {mockPosts.slice(0, 3).map((bestPost, index) => (
            <SwiperSlide key={index} className="w-auto!">
              <PopularPostCard data={bestPost} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section>
        <header className="flex justify-between mb-[24px]">
          <h1 className="text-secondary-900 text-[20px] font-bold">게시글</h1>
          <Button variant="rectangle" className="bg-primary text-white">
            글쓰기
          </Button>
        </header>
        <div className="mb-[24px]">
          <Input
            placeholder="검색할 상품을 입력해주세요"
            prefix={
              <Image
                src="/icons/ic_search.svg"
                alt="search icon"
                width={24}
                height={24}
              />
            }
          />
        </div>
      </section>
    </div>
  );
}
