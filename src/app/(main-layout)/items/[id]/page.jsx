"use client";
import React, { useEffect, useRef } from "react";
import ProductDetailCard from "./_components/ProductDetailCard";
import CommentForm from "../../../../components/common/CommentForm";
import Link from "next/link";
import Image from "next/image";
import ic_back from "@/assets/icons/ic_back.svg";
import CommentCard from "@/components/common/CommentCard";
import { useParams } from "next/navigation";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { productService } from "@/lib/productService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const loadMoreRef = useRef(null);
  const {
    data: productData,
    isPending: isProductPending,
    isError: isProductError,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => {
      const token = localStorage.getItem("accessToken");
      return productService.getProductDetail(id, token);
    },
    enabled: !!id,
    meta: { name: "상품 상세" },
  });
  const {
    data: commentsInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isCommentsPending,
    isError: isCommentsError,
  } = useInfiniteQuery({
    queryKey: ["productComments", id],
    queryFn: ({ pageParam = "" }) =>
      productService.getProductComments(id, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const currentComments = lastPage.list || lastPage || [];
      if (currentComments.length === 5) {
        const lastItem = currentComments[currentComments.length - 1];
        return lastItem.id || null;
      }
      return null;
    },

    enabled: !!id,
  });
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const commentMutation = useMutation({
    mutationFn: (content) => {
      const token = localStorage.getItem("accessToken");
      return productService.createComment(id, content, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productComments", id] });
    },
  });

  const handleCommentSubmit = (content) => {
    commentMutation.mutate(content);
  };

  if (isProductPending || isCommentsPending) {
    return (
      <div className="mt-20 text-center text-lg text-gray-500 font-medium">
        데이터를 불러오는 중입니다 ...
      </div>
    );
  }

  if (isProductError || !productData) {
    return (
      <div className="mt-20 text-center flex flex-col gap-4 justify-center items-center">
        <p className="text-gray-500 font-medium">
          상품 정보를 불러올 수 없습니다.
        </p>
        <Link
          href="/items"
          className="px-4 py-2 bg-primary-100 text-white rounded-lg text-sm"
        >
          상품목록으로 돌아가기
        </Link>
      </div>
    );
  }
  const allComments = commentsInfiniteData?.pages
    ? commentsInfiniteData.pages.flatMap((page) => page.list || page || [])
    : [];
  return (
    <main className="mt-20 flex flex-col justify-center items-center gap-10 mb-30 w-full lg:gap-16">
      <section className="flex flex-col gap-6 max-w-[1200px] w-[344px] md:w-[696px] lg:w-[1200px]">
        <ProductDetailCard product={productData} />

        <div className="flex flex-col gap-10">
          <CommentForm
            onSubmit={handleCommentSubmit}
            title="문의하기"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <div className="flex flex-col gap-4">
            {allComments && allComments.length > 0 ? (
              allComments.map((comment) => (
                <CommentCard key={comment.id} commentItem={comment} />
              ))
            ) : (
              <p className="text-center text-gray-400 text-sm py-4">
                아직 등록된 문의가 없습니다.
              </p>
            )}
            <div
              ref={loadMoreRef}
              className="h-10 w-full flex justify-center items-center"
            >
              {isFetchingNextPage && (
                <p className="text-sm text-gray-400">댓글 더 불러오는 중...</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Link
        href="/items"
        className="flex justify-center py-3 bg-primary-100 w-60 h-12 rounded-[40px] gap-2"
      >
        <p className="text-2lg font-semibold text-gray-100">
          목록으로 돌아가기
        </p>
        <Image
          alt="게시글 목록으로 돌아가기"
          src={ic_back}
          width={24}
          height={24}
        />
      </Link>
    </main>
  );
}
