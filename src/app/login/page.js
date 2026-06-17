import Link from 'next/link';
import Header from '@/app/components/Header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto flex min-h-[520px] max-w-[420px] flex-col justify-center px-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#1F2937]">로그인</h1>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-center text-sm leading-6 text-[#6B7280]">
            로그인 화면은 다음 미션에서 연결할 수 있도록 경로만 준비했습니다.
          </p>
          <Link
            href="/boards"
            className="mt-6 flex h-12 items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white"
          >
            자유게시판으로 이동
          </Link>
        </div>
      </main>
    </div>
  );
}
