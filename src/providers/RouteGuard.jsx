"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "./AuthProvider";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button";

/** 로그인된 사용자만 접근 가능한 경로 */
const protectedPaths = [
  "/items/:id/new",
  "/items/:id/edit",
  "/articles/:id/new",
  "/articles/:id/edit",
];

/** 미인증 사용자만 접근 가능한 경로 */
const authPaths = ["/signin", "/signup"];

const matchPath = (pattern, path) => {
  const regex = new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$");
  return regex.test(path);
};

export default function RouteGuard({ children }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;

    const path = pathname.split("?")[0];
    const isProtectedRoute = protectedPaths.some((route) =>
      matchPath(route, path),
    );
    const isAuthRoute = authPaths.some((route) => matchPath(route, path));

    if (isProtectedRoute && !user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsModalOpen(true); // 바로 push 대신 모달 오픈
    } else if (isAuthRoute && user) {
      router.push("/");
    }
  }, [user, isInitialized, pathname, router]);

  return (
    <>
      {/* 모달 열려있을 때, 보호된 페이지 숨김처리 */}
      {isModalOpen ? null : children}

      {/* 로그인 안내 모달 */}
      <Modal
        description='로그인이 필요합니다.'
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          router.back(); // 모달 닫으면 이전 페이지로
        }}
        buttons={
          <Button
            variant='tertiary'
            type='button'
            onClick={() => {
              setIsModalOpen(false);
              router.push("/signin");
            }}
          >
            로그인
          </Button>
        }
      />
    </>
  );
}
