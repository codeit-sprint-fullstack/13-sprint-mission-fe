
import Image from 'next/image';
import Link from 'next/link';

export default function LogoHeader() {
  return (
    <div className="flex justify-center mb-8">
      <Link href="/" className="flex items-center gap-3">
         <Image 
          src="/image/pandalogo_sm.svg" 
          alt="판다마켓 로고" 
          width={52} 
          height={52} 
          className="md:hidden" 
        />
        <Image 
          src="/image/pandalogo.svg" 
          alt="판다마켓 로고" 
          width={104} 
          height={104} 
          className="hidden md:block" 
        />
        <span className="font-rokaf text-primary-100 font-bold text-[33px] md:text-[66px]">판다마켓</span>
      </Link>
    </div>
  );
}