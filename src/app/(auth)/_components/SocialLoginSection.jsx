import Link from 'next/link'
import Image from 'next/image'

export default function SocialLoginSection() {
  return (
    <div className='flex justify-between rounded-lg items-center py-4 px-6 bg-[#E6F2FF]'>
      <span className='text-lg roun text-gray-800'>간편 로그인하기</span>
      <div className='flex rounded-xl gap-4'>
        <Link href='https://www.google.com' target='_blank'>
          <Image src='/image/ic_google.png' alt='구글 로그인' width={42} height={42} />
        </Link>
        <Link href='https://www.kakaocorp.com' target='_blank'>
          <Image src='/image/ic_kakao.png' alt='카카오 로그인' width={42} height={42} />
        </Link>
      </div>
    </div>
  )
}
