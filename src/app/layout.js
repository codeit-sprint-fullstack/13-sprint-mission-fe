import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 중고 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}