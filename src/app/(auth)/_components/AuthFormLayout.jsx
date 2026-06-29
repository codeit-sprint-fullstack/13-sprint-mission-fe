import Image from "next/image";
import Link from "next/link";

import PageContainer from "@/components/common/PageContainer";

import IcGoogle from "@/app/assets/ic_google.svg";
import IcKakao from "@/app/assets/ic_kakao.svg";
import Logo from "@/app/assets/logo_login.svg";
import SigninForm from "@/app/(auth)/_components/SigninForm";
import SignupForm from "@/app/(auth)/_components/SignupForm";

export default function AuthFormLayout({ type = "signin" }) {
  return (
    <PageContainer size='sm'>
      <section className='py-[80px] md:py-[190px] lg:py-[230px]'>
        <Image
          src={Logo}
          alt='로고 이미지'
          width={396}
          height={132}
          sizes='(max-width: 744px) 196px, 396px'
          className='mx-auto w-[196px] h-[66px] md:w-[396px] md:h-[132px] mb-[24px] md:mb-[40px]'
          priority
        />

        {/* 로그인 Form */}
        {type === "signin" ? <SigninForm /> : <SignupForm />}

        <div className='flex justify-between items-center px-[24px] py-[16px] mb-[24px] rounded-[8px] bg-[#E6F2FF]'>
          <span className='text-[16px]/[calc(26/16)] font-medium text-secondary-800'>
            간편 로그인하기
          </span>
          <div className='flex gap-[16px]'>
            <a href='https://www.google.com' target='_blank'>
              <Image
                src={IcGoogle}
                alt='구글 로그인 하기 아이콘'
                width={42}
                height={42}
              />
            </a>
            <a href='https://www.kakaocorp.com/page' target='_blank'>
              <Image
                src={IcKakao}
                alt='카카오 로그인 하기 아이콘'
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>

        <div className='flex gap-[4px] items-center justify-center'>
          <p className='text-[14px]/[calc(24/14)] font-500 text-secondary-800'>
            {type === "signin"
              ? "판다마켓이 처음이신가요?"
              : "이미 회원이신가요?"}
          </p>
          <Link
            className='text-[14px]/[calc(17/14)] text-primary-100 underline underline-offset-2'
            href={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "회원가입" : "로그인"}
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
