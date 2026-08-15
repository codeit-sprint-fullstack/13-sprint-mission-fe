import Link from "next/link";
import { SignupForm, SocialLoginSection } from "@/features/auth";

export default function SignUpPage() {
  return (
    <>
      <SignupForm />
      <SocialLoginSection />
      <p className="text-sm text-center text-gray-500">
        이미 회원이신가요?{" "}
        <Link href="/auth" className="text-primary-100 font-bold underline ml-1">
          로그인
        </Link>
      </p>
    </>
  );
}
