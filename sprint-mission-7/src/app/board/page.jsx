"use client";
import Button from "@/components/ui/Button";
import Search from "@/components/ui/Search";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Profile from "../../../public/icons/profile.svg";
import Imag from "../../../public/images/image.png";
import Image from "next/image";

export default function BoardPage() {
  const [boards, setBoards] = useState(null); // null=로딩, []=빈 목록
  const [best, setBest] = useState(null);
  const router = useRouter();

  // const [best, setBest] = useState(null);

  useEffect(() => {
    const getBest = async () => {
      try {
        const res = await fetch("http://localhost:4000/boards");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const list = Array.isArray(data) ? data : (data.list ?? []);

        // 최신순(내림차순) 정렬 후 상위 3개
        const latest = [...list]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setBest(latest);
      } catch (err) {
        console.error("fetch 실패:", err);
        setBest([]);
      }
    };
    getBest();
  }, []);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await fetch("http://localhost:4000/boards");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        console.log(data); // 응답 모양 확인용 (확인 후 지우세요)

        // 응답이 배열이면 그대로, { list: [...] } 형태면 list를 꺼냄
        // 필드명이 list가 아니면(data, results 등) 아래를 그에 맞게 변경하세요
        setBoards(Array.isArray(data) ? data : (data.list ?? []));
      } catch (err) {
        console.error("fetch 실패:", err);
        setBoards([]); // 실패해도 배열로 두어 .map 에러 방지
      }
    };
    getBoards();
  }, []);

  return (
    <div className="max-w-[1200px] m-4 mx-auto min-h-200">
      {/* 베스트 게시글 */}
      <div>
        <div>베스트 게시글</div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-4 mt-6">
          {best?.map((board, index) => {
            const visibility =
              index === 0
                ? "" // 항상 보임
                : index === 1
                  ? "hidden tablet:block" // 태블릿(2칸)부터 보임
                  : "hidden pc:block"; // PC(3칸)부터 보임

            return (
              <div
                key={board.id}
                onClick={() => router.push(`/board/${board.id}`)}
                className={`cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 ${visibility}`}
              >
                <div className="font-medium break-words">{board.title}</div>
                <div className="mt-2 text-xs text-gray-400">
                  {format(new Date(board.createdAt), "yyyy.MM.dd")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 게시글 */}
      <div className="mt-10">
        <div className="flex w-full justify-between items-center">
          <span>게시글</span>
          <Button size={"small"} onClick={() => router.push("/board/write")}>
            글쓰기
          </Button>
        </div>

        <div className="mt-10">
          <Search placeholder="검색할 상품을 입력해주세요." />
        </div>

        {/* 게시글 목록 */}
        <div className="flex flex-col gap-4 mt-6">
          {boards === null ? (
            <div className="py-10 text-center text-sm text-gray-400">
              불러오는 중...
            </div>
          ) : !Array.isArray(boards) || boards.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
              등록된 게시글이 없습니다.
            </div>
          ) : (
            boards.map((board) => (
              <div
                key={board.id}
                onClick={() => router.push(`/board/${board.id}`)}
                className="cursor-pointer bg-[#fcfcfc] border-b border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="font-medium flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0 break-words">
                    {board.title}
                  </div>
                  <Image
                    src={Imag}
                    width={40}
                    height={40}
                    alt=""
                    className="shrink-0 w-10 h-10 object-contain"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Image
                      src={Profile}
                      width={20}
                      height={20}
                      alt="임시회원 이미지"
                    />
                    임시 회원{" "}
                    <span>
                      {format(new Date(board.createdAt), "yyyy.MM.dd")}
                    </span>
                  </span>
                  <span>좋아요</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
