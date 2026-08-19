import Image from "next/image";
import Logo from "@/assets/logo/logo.svg";
import Link from "next/link";
import SocialLoginBox from "../_components/SocialLoginBox";
import SignInForm from "./_components/SignInForm";

export default function SignIn() {
  return (
    <div className="flex w-full max-w-480 px-160 pt-57.75 pb-71">
      <div className="flex w-full max-w-160 shrink-0 flex-col items-center gap-10">
        <Link href="/">
          <Image src={Logo} alt="로고" width={396} height={132} />
        </Link>

        <section className="flex w-full flex-col items-center gap-6 self-stretch">
          <SignInForm />
          <SocialLoginBox />
          <div className="flex items-center justify-center gap-1">
            <span className="text-md text-secondary-800 font-medium">
              판다마켓이 처음이신가요?
            </span>
            <Link
              href="/signup"
              className="text-primary-100 text-md font-medium underline"
            >
              회원가입
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
