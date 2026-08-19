import type { Metadata } from "next";
import type { ReactNode } from "react";
import ConditionalLayout from "../src/components/ConditionalLayout";
import QueryProvider from "../src/components/QueryProvider";
import { AuthProvider } from "../src/context/AuthContext";
import "../src/styles/globals.css";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "일상의 모든 물건을 거래해 보세요",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white font-pretendard text-gray-700">
        <QueryProvider>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
