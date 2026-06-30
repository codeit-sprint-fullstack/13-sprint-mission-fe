import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

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
      </body>
    </html>
  );
}