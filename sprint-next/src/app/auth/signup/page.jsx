import Link from "next/link";
import SignupForm from "../_components/SignupForm";
import SocialLoginSection from "../_components/SocialLoginSection";

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
