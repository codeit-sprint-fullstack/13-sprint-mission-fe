import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/panda_logo.svg";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
      <Link href="/" className="flex items-center gap-2 md:gap-3 mb-10">
        <Image
          src={Logo}
          alt="판다마켓 로고"
          width={64}
          height={64}
          className="md:w-[6.4706rem] md:h-[6.4925rem]"
        />
        <span className="font-rokaf font-bold text-[2.0733rem] md:text-[4.1465rem] text-primary-100">
          판다마켓
        </span>
      </Link>

      <section className="w-full max-w-160 flex flex-col gap-6">
        {children}
      </section>
    </div>
  );
}
