import Link from "next/link";
import { LoginForm, SocialLoginSection } from "@/features/auth";

export default function SignInPage() {
  return (
    <>
      <LoginForm />
      <SocialLoginSection />
      <p className="text-sm text-center text-gray-500">
        판다마켓이 처음이신가요?{" "}
        <Link href="/auth/signup" className="text-primary-100 font-bold underline ml-1">
          회원가입
        </Link>
      </p>
    </>
  );
}
