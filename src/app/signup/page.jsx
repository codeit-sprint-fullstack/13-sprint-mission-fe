import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/app/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-160 flex flex-col items-center gap-20">
        <Link href="/" className="flex items-center justify-center gap-7">
          <Image
            src="/logo/panda-logo.svg"
            alt="판다마켓 로고"
            width={103}
            height={103}
            className="object-contain"
          />
          <h1 className="text-primary font-rokaf text-[66.344px] font-bold leading-normal">
            판다마켓
          </h1>
        </Link>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}