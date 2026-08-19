import Image from "next/image";
import Logo from "@/assets/logo/logo.svg";
import Link from "next/link";
import SocialLoginBox from "../_components/SocialLoginBox";
import SignUpForm from "./_components/SignUpForm";

export default function SignUp() {
  return (
    <div className="flex w-full max-w-480 items-center justify-center px-160 pt-15 pb-44.5">
      <div className="flex w-full shrink-0 flex-col items-center gap-10">
        <Link href="/">
          <Image src={Logo} alt="로고" width={396} height={132} />
        </Link>

        <section className="flex w-full flex-col items-center gap-6 self-stretch">
          <SignUpForm />
          <SocialLoginBox />
          <div className="flex items-center justify-center gap-1">
            <span className="text-md text-secondary-800 font-medium">
              이미 회원이신가요?
            </span>
            <Link
              href="/signin"
              className="text-primary-100 text-md font-medium underline"
            >
              로그인
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
