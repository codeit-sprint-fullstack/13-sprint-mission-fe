"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

import UserIcon from "@/components/ui/UserIcon";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import CommentItem from "@/components/ui/CommentItem";
import Menu from "@/components/ui/Menu";
import Modal from "@/components/ui/Modal";

import { getDate } from "@/utils/getDate";
import { boardService } from "@/lib/boardService";
import { commentService } from "@/lib/commentService";

export default function PostDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const boardId = pathname.split("/")[2];
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [openedMenuId, setOpenedMenuId] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const { data: data } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => boardService.getArticleDetail(boardId),
  });
  const { mutate: deletePost } = useMutation({
    mutationKey: ["board", boardId, "delete"],
    mutationFn: boardService.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
      router.push("/board");
    },
    onError: (e) => {
      setModalMessage(e.message);
    },
  });

  // 제공된 API에 Product의 Comment만 있고 Article의 Comment는 없어서 잠시 주석 처리
  /*async function postComment() {
    // validation
    if (!comment.trim()) return;

    // userId는 아직 회원가입이 만들어지지 않아서 임의로 1로 지정
    await commentService.postComment(boardId, {
      content: comment,
      userId: 1,
    });
    setComment("");
    getPostDetail();
  }
  async function deleteComment() {
    const result = confirm("댓글을 삭제하시겠습니까?");
    if (!result) return;

    await commentService.deleteComment(boardId, openedMenuId);
    getPostDetail();
  }*/

  const boardMenus = [
    {
      name: "수정하기",
      onClick: () => {
        if (user.id !== data.writer.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        router.push(`/board/${boardId}/edit`);
      },
    },
    {
      name: "삭제하기",
      onClick: async () => {
        if (user.id !== data.writer.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        const result = confirm("게시글을 삭제하시겠습니까?");
        if (!result) return;

        await deletePost(boardId);
      },
    },
  ];
  /*const commentMenus = [
    {
      name: "수정하기",
      onClick: () => {},
    },
    {
      name: "삭제하기",
      onClick: async () => {
        await deleteComment();
      },
    },
  ];*/

  return (
    <div className="m-auto w-[1200px] py-[26px] flex-1 max-desktop:px-[20px] max-desktop:w-full">
      <header className="border-b border-b-secondary-200">
        <div className="relative flex justify-between items-start mb-[16px]">
          <h1 className="font-bold text-[20px]/[32px]">{data?.title}</h1>
          <Image
            src="/icons/ic_kebab.svg"
            alt="kebab icon"
            width={24}
            height={24}
            onClick={() => {
              setOpenedMenuId((prev) => (prev === 0 ? null : 0));
            }}
            className="cursor-pointer"
          />
          {openedMenuId === 0 && (
            <Menu
              menus={boardMenus}
              onClick={() => {
                setOpenedMenuId((prev) => (prev === 0 ? null : 0));
              }}
              className="right-0 mt-[28px]"
            />
          )}
        </div>
        <div className="flex h-fit mb-[16px]">
          <div className="flex items-center">
            <UserIcon width={40} height={40} />
            <h2 className="text-[14px]/[24px] font-medium ml-[16px] mr-[8px]">
              {data?.writer.nickname}
            </h2>
            <p className="text-[14px]/[24px] text-secondary-400 font-normal">
              {getDate(data?.createdAt)}
            </p>
          </div>
          <div className="w-px self-stretch bg-secondary-200 mx-[32px]"></div>
          <div
            onClick={() => {
              setIsLikeClicked((prev) => !prev);
            }}
            className="w-fit flex items-center border border-secondary-200 rounded-[35px] px-[12px] py-[4px] gap-[3px]"
          >
            <Image
              src={
                isLikeClicked
                  ? "/icons/ic_heart_full.svg"
                  : "/icons/ic_heart_empty.svg"
              }
              alt="heart icon"
              width={32}
              height={32}
            />
            {data?.likeCount}
          </div>
        </div>
      </header>
      <p className="text-[18px]/[26px] mt-[24px] mb-[32px] whitespace-pre-wrap">
        {data?.content}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postComment();
        }}
      >
        <FormField
          title="댓글달기"
          placeholder="댓글을 입력해주세요."
          multiline={true}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="h-[104px] "
        />
        <div className="flex justify-end mt-[16px] mb-[40px]">
          <Button
            variant="rectangle"
            type="submit"
            disabled={comment.trim().length === 0}
            className="bg-primary text-white"
          >
            등록
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-[24px] mb-[64px]">
        {/*data?.comments.map((comment, index) => (
          <div key={index}>
            <CommentItem
              data={comment}
              onMenuClick={() => {
                setOpenedMenuId((prev) =>
                  prev === comment.id ? null : comment.id,
                );
              }}
            >
              {comment.id === openedMenuId && (
                <Menu
                  menus={commentMenus}
                  onClick={() => {
                    setOpenedMenuId(null);
                  }}
                  className="right-0 mt-[24px]"
                />
              )}
            </CommentItem>
          </div>
        ))*/}
      </div>
      <Link href="/board">
        <Button
          variant="circle"
          type="button"
          className="flex items-center gap-[8px] bg-primary text-white px-[40px] py-[11px] m-auto mb-[38px]"
        >
          목록으로 돌아가기
          <Image
            src="/icons/ic_back.svg"
            alt="back icon"
            width={24}
            height={24}
          />
        </Button>
      </Link>
      <Modal
        text={modalMessage}
        disabled={!!!modalMessage}
        onClick={() => setModalMessage("")}
      />
    </div>
  );
}
