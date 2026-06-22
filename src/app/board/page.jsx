"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import PostItem from "@/components/ui/PostItem";
import PopularPostCard from "@/components/ui/PopularPostCard";

import { boardService } from "@/lib/boardService";
import "swiper/css";

export default function BoardListPage() {
  const menu = ["최신순", "좋아요순"];
  const [posts, setPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(menu[0]);

  async function getArticles() {
    const orderBy = `orderBy=${clicked === "최신순" ? "createdAt" : "favoriteCount"}`;
    const keyword = input ? `keyword=${input}` : "";
    const query = `${orderBy}&${keyword}`;

    const response = await boardService.getArticles(query);
    setPosts(response.list);
  }
  async function getBestArticles() {
    const response = await boardService.getBestArticles();
    setBestPosts(response);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBestArticles();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getArticles();
  }, [input, clicked]);

  return (
    <div className="m-auto w-[1200px] py-[16px] flex-1 max-desktop:px-[20px] max-desktop:w-full">
      <section className="mb-[24px]">
        <h1 className="text-secondary-900 text-[20px] font-bold mb-[24px]">
          베스트 게시글
        </h1>
        <Swiper slidesPerView="auto" spaceBetween={24}>
          {bestPosts.map((bestPost, index) => (
            <SwiperSlide key={index} className="w-auto!">
              <PopularPostCard data={bestPost} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section>
        <header className="flex justify-between mb-[24px]">
          <h1 className="text-secondary-900 text-[20px] font-bold">게시글</h1>
          <Link href="/board/create">
            <Button
              type="button"
              variant="rectangle"
              className="bg-primary text-white"
            >
              글쓰기
            </Button>
          </Link>
        </header>
        <div className="flex items-center gap-[6px]">
          <Input
            value={input}
            placeholder="검색할 상품을 입력해주세요"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            prefix={
              <Image
                src="/icons/ic_search.svg"
                alt="search icon"
                width={24}
                height={24}
              />
            }
          />
          <Dropdown menus={menu} value={clicked} onChange={setClicked} />
        </div>
        <div className="flex flex-col gap-6 mt-[24px] mb-[78px]">
          {posts.map((post, index) => (
            <PostItem data={post} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
