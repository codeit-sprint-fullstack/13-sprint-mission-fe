import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";

import IcProfile from "@/app/assets/ic_profile.svg";

export default function Avatar({ user }) {
  if (user)
    return (
      <div className='flex justify-center items-center gap-[6px]'>
        <Image src={IcProfile} width={40} height={40} alt='유저 프로필 사진' />
        <span className='hidden md:block md:text-[16px]/[calc(19/16)] lg:text-[18px]/[calc(22/16)] text-gray-600'>
          {user.nickname}
        </span>
      </div>
    );

  return (
    <Button as={Link} href='/signin'>
      로그인
    </Button>
  );
}
