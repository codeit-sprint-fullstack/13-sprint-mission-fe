import Image from "next/image";
import Link from "next/link";

export default function AuthLogo() {
  return (
    <Link href="/" className="mb-10 flex items-center justify-center gap-4">
      <Image
        src="/images/logo.svg"
        alt="판다마켓 로고"
        width={104}
        height={104}
        style={{ width: 104, height: 104 }}
        priority
      />
      <span className="text-[66px] font-bold leading-none text-brand-blue">
        판다마켓
      </span>
    </Link>
  );
}
