import localFont from "next/font/local";

import "./globals.css";

import Providers from "@/app/providers";
import { getServerSideToken } from "@/lib/actions/auth";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const pretendard = localFont({
  src: "./fonts/Pretendard/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata = {
  title: "판마 마켓",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // accessToken이 없거나 만료된 경우엔 null로 두고, 클라이언트의 AuthProvider가
  // Route Handler(/api/users/me)를 통해 안전하게 갱신하도록 함
  const accessToken = await getServerSideToken("accessToken");
  const initialUser = accessToken
    ? await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((body) => body?.data ?? null)
        .catch(() => null)
    : null;

  return (
    <html lang='ko' className={`${pretendard.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-pretendard'>
        <Providers initialUser={initialUser}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
