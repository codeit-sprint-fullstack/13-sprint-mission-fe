"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import useItem from "../_hooks/useItem";
import useItemMutations from "../_hooks/useItemMutations";
import useItemCommentMutations from "../_hooks/useItemCommentMutations";
import FormField from "@/components/ui/FormField";
import UserIcon from "@/components/ui/UserIcon";
import Button from "@/components/ui/Button";
import CommentItem from "@/components/ui/CommentItem";
import Menu from "@/components/ui/Menu";
import Modal from "@/components/ui/Modal";

import { useAuth } from "@/providers/AuthProvider";
import { getDate } from "@/utils/getDate";
import { CommentType } from "@/types/comment";

export default function ItemPage() {
  const router = useRouter();
  const { itemId } = useParams();
  const { user } = useAuth();

  const { item } = useItem({ itemId: Number(itemId) });
  const { deleteItemMutation } = useItemMutations({ itemId: Number(itemId) });
  const { postItemCommentMutation, deleteItemCommentMutation } =
    useItemCommentMutations({ itemId: Number(itemId) });

  const [isLikeClicked, setIsLikeClicked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");

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
        deleteItemCommentMutation.mutate(
          { commentId: Number(comment.id) },
          {
            onError: (e) => {
              setModalMessage(e.message);
            },
          },
        );
      },
    },
  ];
  const boardMenus = [
    {
      name: "수정하기",
      onClick: () => {
        if (user?.id !== item?.user.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }
        router.push(`/items/${itemId}/edit`);
      },
    },
    {
      name: "삭제하기",
      onClick: async () => {
        if (user?.id !== item?.user.id) {
          setModalMessage("게시글 작성자만 수정할 수 있습니다.");
          return;
        }

        const result = confirm("게시글을 삭제하시겠습니까?");
        if (!result) return;

        deleteItemMutation.mutate();
      },
    },
  ];

  if (!item) return <div className="flex-1">Loading...</div>;
  return (
    <div className="m-auto w-[1200px] py-[26px] flex-1 max-desktop:px-[20px] max-desktop:w-full">
      <div className="w-full flex gap-[16px] pb-[32px] border-b border-b-secondary-200 max-tablet:flex-col">
        <Image
          src={
            !!item.images.length
              ? `${process.env.NEXT_PUBLIC_API_URL}/${item.images[0].url}`
              : "/images/item2.jpg"
          }
          width={500}
          height={500}
          alt="아이템 이미지"
          unoptimized
          className="shrink-0 aspect-square rounded-[16px] max-desktop:max-x-[500px] max-desktop:min-x-[350px] max-tablet:w-full"
        />
        <main className="w-full">
          <section className="relative border-b border-b-secondary-200 pb-[16px] flex justify-between items-start">
            <div>
              <h1 className="text-[20px]/[42px] text-secondary-800 font-semibold">
                {item.name}
              </h1>
              <h1 className="text-[32px]/[42px] text-secondary-800 font-semibold">
                {item.price.toLocaleString()}원
              </h1>
            </div>

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
          </section>
          <section className="mb-[24px] pt-[16px]">
            <h2 className="text-[14px]/[24px] text-secondary-600 font-semibold mb-[8px]">
              상품 소개
            </h2>
            <p>{item.description}</p>
          </section>
          <section>
            <h2 className="text-[14px]/[24px] text-secondary-600 font-semibold mb-[8px]">
              상품 태그
            </h2>
            <div className="flex flex-wrap gap-[8px]">
              {item.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="whitespace-nowrap bg-secondary-100 rounded-[26px] px-[16px] py-[5px]"
                >
                  #{tag.name}
                </div>
              ))}
            </div>
          </section>
          <section className="w-full flex justify-between items-center gap-[5px] mt-[40px]">
            <div className="flex gap-[16px]">
              <UserIcon width={40} height={40} />
              <div className="flex-col">
                <p className="text-secondary-600 text-[14px]/[24px] whitespace-nowrap">
                  {item.user.username}
                </p>
                <p className="text-secondary-400 text-[14px]/[24px] whitespace-nowrap">
                  {getDate(item.createdAt)}
                </p>
              </div>
            </div>
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
              {item?.favoriteCount}
            </div>
          </section>
        </main>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postItemCommentMutation.mutate(
            { content: comment },
            {
              onSuccess: () => {
                setComment("");
              },
            },
          );
        }}
        className="my-[40px]"
      >
        <FormField
          title="문의하기"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          multiline={true}
          value={comment}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            setComment(e.target.value);
          }}
          className="h-[104px]"
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
        {!item?.comments.length && (
          <div>
            <Image
              src="/images/emtpy_product_comment.png"
              width={195}
              height={230}
              alt="문의 없음 이미지"
              className="m-auto"
            />
          </div>
        )}
        {item?.comments.map((comment) => (
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
      <Link href="/items">
        <Button
          disabled={false}
          variant="circle"
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
