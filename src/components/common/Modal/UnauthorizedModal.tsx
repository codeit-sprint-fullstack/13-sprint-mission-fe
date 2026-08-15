"use client";

import { useRouter } from "next/navigation";

import Modal from "@/components/common/Modal/Modal";

/** 본인이 작성하지 않은 글/상품의 수정 페이지 접근을 막는 안내 모달 */
export default function UnauthorizedModal({
  redirectTo,
  description = "본인이 작성한 페이지가 아닙니다.",
}: {
  redirectTo: string;
  description?: string;
}) {
  const router = useRouter();

  function handleClose() {
    router.replace(redirectTo);
  }

  return <Modal description={description} isOpen onClose={handleClose} />;
}
