"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

import useBoard from "../_hooks/useBoard";
import useBoardMutations from "../_hooks/useBoardMutations";
import useCommentMutations from "../_hooks/useCommentMutations";
import UserIcon from "@/components/ui/UserIcon";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import CommentItem from "@/components/ui/CommentItem";
import Menu from "@/components/ui/Menu";
import Modal from "@/components/ui/Modal";

import { getDate } from "@/utils/getDate";
import { MenuType } from "@/types/menu";
import { CommentType } from "@/types/comment";

export default function PostDetailPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { boardId } = useParams<{ boardId: string }>();

  const { postDetail, isPostDetailPending } = useBoard({
    boardId: Number(boardId),
  });
  const { deletePostMutation } = useBoardMutations({
    boardId: Number(boardId),
  });
  const { postCommentMutation, deleteCommentMutation } = useCommentMutations({
    boardId: Number(boardId),
  });
  const [isLikeClicked, setIsLikeClicked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");

  const boardMenus: MenuType[] = [
    {
      name: "수정하기",
      onClick: () => {
        if (user?.id !== postDetail?.user.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        router.push(`/board/${boardId}/edit`);
      },
    },
    {
      name: "삭제하기",
      onClick: async () => {
        if (user?.id !== postDetail?.user.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        const result = confirm("게시글을 삭제하시겠습니까?");
        if (!result) return;

        deletePostMutation.mutate(
          { id: Number(boardId) },
          {
            onError: (e) => {
              setModalMessage(e.message);
            },
          },
        );
      },
    },
  ];
  const createCommentMenus = (comment: CommentType) => [
    {
      name: "수정하기",
      onClick: () => {},
    },
    {
      name: "삭제하기",
      onClick: () => {
        if (user?.id !== comment.user.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        const result = confirm("게시글을 삭제하시겠습니까?");
        if (!result) return;
        deleteCommentMutation.mutate(
          { id: comment.id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["board"],
              });
              setComment("");
            },
          },
        );
      },
    },
  ];

  return (
    <div className="m-auto w-[1200px] py-[26px] flex-1 max-desktop:px-[20px] max-desktop:w-full">
      <header className="border-b border-b-secondary-200">
        <div className="relative flex justify-between items-start mb-[16px]">
          <h1 className="font-bold text-[20px]/[32px]">{postDetail?.title}</h1>
          <Image
            src="/icons/ic_kebab.svg"
            alt="케밥 아이콘"
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
              {postDetail?.user.username}
            </h2>
            <p className="text-[14px]/[24px] text-secondary-400 font-normal">
              {postDetail?.createdAt && getDate(postDetail?.createdAt)}
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
              alt="좋아요 아이콘"
              width={32}
              height={32}
            />
            {postDetail?.favoriteCount}
          </div>
        </div>
      </header>
      <p className="text-[18px]/[26px] mt-[24px] mb-[32px] whitespace-pre-wrap">
        {postDetail?.content}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!user) {
            alert("로그인이 필요합니다.");
            return;
          }
          postCommentMutation.mutate(
            { userId: user?.id, content: comment },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["board"],
                });
                setComment("");
              },
            },
          );
        }}
      >
        <FormField
          title="댓글달기"
          placeholder="댓글을 입력해주세요."
          multiline={true}
          value={comment}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
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
        {postDetail?.comments?.map((comment) => (
          <div key={comment.id}>
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
                  menus={createCommentMenus(comment)}
                  onClick={() => {
                    setOpenedMenuId(null);
                  }}
                  className="right-0 mt-[24px]"
                />
              )}
            </CommentItem>
          </div>
        ))}
      </div>
      <Link href="/board">
        <Button
          variant="circle"
          disabled={false}
          type="button"
          className="flex items-center gap-[8px] bg-primary text-white px-[40px] py-[11px] m-auto mb-[38px]"
        >
          목록으로 돌아가기
          <Image
            src="/icons/ic_back.svg"
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
          />
        </Button>
      </Link>
      <Modal
        text={modalMessage}
        disabled={!modalMessage}
        onClick={() => setModalMessage("")}
      />
    </div>
  );
}
