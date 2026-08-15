import { checkAuthWithRefresh } from "@/lib/actions/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 체크 (accessToken 또는 refreshToken 중 하나라도 있으면 통과)
  const isAuthenticated = await checkAuthWithRefresh();

  // 인증 실패 시 로그인 페이지로
  if (!isAuthenticated) {
    redirect("/signin", RedirectType.replace);
  }

  return <div>{children}</div>;
}
