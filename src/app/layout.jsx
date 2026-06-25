import Providers from "../providers/ReactQueryProvider";
import "./global.css";

export const metadata = {
  title: "판다마켓",
  description: "React Query로 구성한 판다마켓 중고 거래 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
