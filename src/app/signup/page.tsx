'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import { saveSession, signUp } from '@/lib/auth';

const INPUT_CLS =
  'h-14 w-full rounded-xl border-0 bg-[#F3F4F6] px-6 text-base text-[#1F2937] placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid =
    email.trim() && nickname.trim() && password.trim() && passwordConfirmation.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    if (password !== passwordConfirmation) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const session = await signUp({
        email: email.trim(),
        nickname: nickname.trim(),
        password,
        passwordConfirmation,
      });
      saveSession(session);
      router.push('/items');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto flex min-h-[520px] max-w-[420px] flex-col justify-center px-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#1F2937]">회원가입</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <label htmlFor="signup-email" className="sr-only">
            이메일
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="이메일"
            className={INPUT_CLS}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="signup-nickname" className="sr-only">
            닉네임
          </label>
          <input
            id="signup-nickname"
            type="text"
            autoComplete="nickname"
            placeholder="닉네임"
            className={INPUT_CLS}
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />

          <label htmlFor="signup-password" className="sr-only">
            비밀번호
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호"
            className={INPUT_CLS}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <label htmlFor="signup-password-confirmation" className="sr-only">
            비밀번호 확인
          </label>
          <input
            id="signup-password-confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
            className={INPUT_CLS}
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />

          <p role="alert" className="min-h-5 text-sm text-rose-500">
            {error}
          </p>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex h-12 items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-4 text-center text-sm text-[#6B7280] hover:text-[#3692FF]"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </main>
    </div>
  );
}
