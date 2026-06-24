import React from "react";
import AuthForm from "../_components/AuthForm";
import Image from "next/image";
import text_logo from "../../../assets/imgs/text_logo.png";
import Link from "next/link";
import AuthModal from "../_components/AuthModal";

export default function SinginPage() {
  return (
    <main className="flex flex-col w-full mt-6 md:mt-12 lg:mt-15 mb-40">
      <div className="max-w-[640px] flex flex-col items-center mx-auto gap-6 md:gap-10">
        <Image
          alt="로고"
          src={text_logo}
          width={396}
          height={132}
          className="w-[198px] h-[66px] md:w-[396px] md:h-[132px]"
        />
        <div>
          <AuthForm />
          
        </div>
      </div>
    </main>
  );
}
