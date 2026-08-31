/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * 배포된 백엔드로의 프록시.
   *
   * Vercel은 항상 HTTPS로 서비스되는데 EC2 백엔드는 HTTP라서,
   * 브라우저에서 직접 호출하면 Mixed Content로 차단된다.
   * 그래서 브라우저는 같은 출처(/api)로만 요청하고, Vercel 서버가 대신
   * 백엔드를 호출하도록 넘긴다. 서버 간 통신이라 프로토콜 제약을 받지 않는다.
   *
   *   브라우저 --HTTPS--> Vercel --HTTP--> EC2
   *
   * BACKEND_ORIGIN이 없으면(로컬 개발) 프록시를 걸지 않고,
   * NEXT_PUBLIC_API_URL에 적힌 주소로 직접 호출한다.
   */
  async rewrites() {
    const backendOrigin = process.env.BACKEND_ORIGIN;
    if (!backendOrigin) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${backendOrigin.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
