"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import kebabImg from "../../../assets/ic_kebab.png";
import DropDownList from "@/components/common/DropDownList";
import profileImg from "../../../assets/ic_profile.svg";
import heartImg from "../../../assets/ic_heart.svg";
import backImg from "../../../assets/ic_back.svg";
import CommentItem from "./_components/CommentItem";
import Link from "next/link";
import { marketAPI } from "@/lib/services/marketApi";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const [open, isOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [articleData, setArticle] = useState<{
    title: string;
    createdAt: number;
    content: string;
  }>({ title: "", createdAt: 0, content: "" });
  const [comments, setCommets] = useState<{ id: number; content: string }[]>(
    [],
  );
  const [fieldComment, setFieldComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const isEnabled: string = fieldComment.trim();
  const router = useRouter<AppRouterInstance>();

  const fetchCommentData = async () => {
    const [articleRes, commentRes] = await Promise.all([
      marketAPI.getDetailArticle(id),
      marketAPI.getComments(id),
    ]);
    setCommets(commentRes);
    setArticle(articleRes);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCommentData();
  }, []);

  const handleSubmit = async () => {
    const data = await marketAPI.postComment({ content: fieldComment }, id);
    if (!comments || comments.length === 0) setCommets([data]);
    else setCommets([...comments, data]);
    setFieldComment("");
  };

  const updateFunc = () => {
    router.push(`/patch?id=${id}`);
  };

  const deleteFunc = async () => {
    await marketAPI.deleteArticle(id);
    router.push(`/community`);
  };

  if (loading) {
    return <div className="text-center mt-10">로딩중...</div>;
  }

  return (
    <div className="flex flex-col items-start gap-[2rem] self-stretch max-w-[75rem] mt-[1.5rem] mx-auto">
      <section className="flex flex-col items-start gap-[1rem] self-stretch">
        <div className="flex justify-between items-start gap-[0.5rem] self-stretch relative">
          <h2 className="font-pretendard text-[1.25rem] font-[700] leading-[2rem] text-[#1F2937]">
            {articleData.title}
          </h2>
          <Image
            className="cursor-pointer"
            src={kebabImg}
            alt="옵션 이미지"
            onClick={() => isOpen(!open)}
          ></Image>
          {open && (
            <DropDownList
              updateFunc={updateFunc}
              deleteFunc={deleteFunc}
            ></DropDownList>
          )}
        </div>
        <div className="flex gap-[2rem] self-stretch items-center">
          <div className="flex gap-[1rem] items-center">
            <Image
              className="w-[2.5rem] h-[2.5rem]"
              src={profileImg}
              alt="프로필 이미지"
            />
            <div className="flex gap-[0.5rem] items-center">
              <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#4B5563]">
                총명한 판다
              </span>
              <span className="font-pretendard text-[0.875remrem] font-[400] leading-[1.5rem] text-[#9CA3AF]">
                {new Date(articleData.createdAt)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .slice(0, -1)}
              </span>
            </div>
          </div>

          <div className="flex gap-[2rem] items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1"
              height="34"
              viewBox="0 0 1 34"
              fill="none"
            >
              <path d="M0.5 0V34" stroke="#E5E7EB" />
            </svg>
            <div className="flex gap-[0.25rem] justify-center items-center h-[2.5rem] py-[0.25rem] px-[0.75rem] bg-[#fff] border border-[#E5E7EB] rounded-[2.1875rem]">
              <Image
                className="w-[2rem] h-[2rem]"
                src={heartImg}
                alt="하트 이미지"
              />
              <span className="font-pretendard text-[1rem] font-[500] leading-[1.625rem] text-[#6B7280]">
                123
              </span>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1200"
          height="1"
          viewBox="0 0 1200 1"
          fill="none"
        >
          <path d="M0 0.5H1200" stroke="#E5E7EB" />
        </svg>
        <span className="font-pretendard text-[1.125rem] font-[400] leading-[1.625rem] text-[#1F2937]">
          {articleData.content}
        </span>
      </section>
      <section className="flex flex-col items-start gap-[2.5rem] self-stretch">
        <div className="flex flex-col items-end gap-[1rem]  self-stretch">
          <div className="flex flex-col gap-[0.5625rem]  self-stretch">
            <h2 className="font-pretendard text-[1rem] font-[600] leading-[1.625rem] text-[#111827]">
              댓글달기
            </h2>
            <div className="flex gap-[0.625rem]  w-full  h-[6.5rem] items-start py-[1rem] px-[1.5rem] bg-[#F3F4F6] rounded-[0.75rem]">
              <textarea
                className="flex-1 h-full resize-none font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
                placeholder="댓글을 입력해주세요."
                value={fieldComment}
                onChange={(e) => setFieldComment(e.target.value)}
              />
            </div>
          </div>
          <button
            disabled={!isEnabled}
            className={`rounded-lg ${isEnabled ? "bg-[#3692FF]" : "bg-[#9CA3AF]"} h-10.5 px-[1.44rem] cursor-pointer`}
            onClick={handleSubmit}
          >
            <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
              등록
            </span>
          </button>
        </div>
        <div className="flex flex-col flex-wrap items-start gap-[1.5rem] w-full">
          {comments
            ? comments.map((comment) => {
                return (
                  <CommentItem
                    key={comment.id}
                    content={comment.content}
                    setComments={setCommets}
                    id={id}
                    commentId={comment.id}
                  />
                );
              })
            : "댓글이 없습니다."}
        </div>
      </section>
      <Link
        href={"/community"}
        className="flex w-[15rem] h-[3rem] py-[0.75rem] px-[4rem] justify-center items-center gap-[0.5rem] bg-[#3692FF] rounded-[2.5rem] mx-auto"
      >
        <span className="whitespace-nowrap text-[#F3F4F6] text-center font-pretendard text-[1.125rem] leading-[1.625rem] font-[600]">
          목록으로 돌아가기
        </span>
        <Image src={backImg} alt="돌아가기 이미지" />
      </Link>
    </div>
  );
}
