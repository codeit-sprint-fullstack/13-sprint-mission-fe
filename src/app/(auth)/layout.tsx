import { checkAuth } from "@/lib/actions/auth";
import { redirect, RedirectType } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 인증 체크 (accessToken 검사만)
  const isAuthenticated = await checkAuth();

  // 이미 인증된 사용자는 랜딩 페이지로 리다이렉트
  if (isAuthenticated) {
    // 리다이렉트 시, 두 번째 인자도 같이 남겨서 뒤로가기 했을때 불필요한 동작 발생 방지
    redirect("/", RedirectType.replace);
  }

  return <div>{children}</div>;
}
