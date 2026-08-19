import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "../providers/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "React Query로 구성한 판다마켓 중고 거래 서비스",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
