"use client";

import CommentBoard from "@/components/comments/CommentBoard";
import {
  createPcomment,
  deletePcomment,
  getPcomments,
  updatePcomment,
} from "@/lib/ProductApi";
import { useLayoutEffect, useState } from "react";

export default function Inquiry({ productId }: { productId: string }) {
  const [backHref, setBackHref] = useState("/items");

  useLayoutEffect(() => {
    const saved = localStorage.getItem("sortOrder");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage (external store) once before paint, without causing an SSR/client mismatch
    if (saved) setBackHref(`/items?orderBy=${saved}`);
  }, []);

  return (
    <CommentBoard
      queryKey={["comments", "product", productId]}
      queryFn={() => getPcomments(productId)}
      createFn={(content) => createPcomment(productId, content)}
      updateFn={(commentId, content) => updatePcomment(commentId, content)}
      deleteFn={(commentId) => deletePcomment(commentId)}
      heading="문의하기"
      placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      deleteConfirmText="문의를 삭제하시겠습니까?"
      emptyImageSrc="/images/Img_inquiry_empty.png"
      emptyImageAlt="문의 없음"
      emptyImageWidth={196}
      emptyImageHeight={230}
      emptyText="아직 문의가 없어요."
      backHref={backHref}
    />
  );
}
