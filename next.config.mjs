/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://panda-market-api.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
