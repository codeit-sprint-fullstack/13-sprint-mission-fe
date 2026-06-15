"use client";

import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/Pretendard/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export default function GlobalError({ error, reset }) {
  return (
    <html lang='ko' className={`${pretendard.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-pretendard'>
        <h2>일시적인 오류가 발생했습니다.</h2>
        <button onClick={() => reset()}>다시 시도하기</button>
      </body>
    </html>
  );
}
