'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import { saveSession, signIn } from '@/lib/auth';

const INPUT_CLS =
  'h-14 w-full rounded-xl border-0 bg-[#F3F4F6] px-6 text-base text-[#1F2937] placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid = email.trim() && password.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const session = await signIn({ email: email.trim(), password });
      saveSession(session);
      router.push('/items');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto flex min-h-[520px] max-w-[420px] flex-col justify-center px-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#1F2937]">로그인</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <label htmlFor="login-email" className="sr-only">
            이메일
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="이메일"
            className={INPUT_CLS}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="login-password" className="sr-only">
            비밀번호
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            className={INPUT_CLS}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <p role="alert" className="min-h-5 text-sm text-rose-500">
            {error}
          </p>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex h-12 items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <Link
          href="/signup"
          className="mt-4 text-center text-sm text-[#6B7280] hover:text-[#3692FF]"
        >
          계정이 없으신가요? 회원가입
        </Link>
      </main>
    </div>
  );
}
