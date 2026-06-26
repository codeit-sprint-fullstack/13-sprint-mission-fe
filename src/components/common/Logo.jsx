import Link from "next/link";

export default function Logo({ large = false }) {
  return (
    <Link
      className={`inline-flex items-center whitespace-nowrap font-black tracking-normal text-[#3692ff] ${
        large ? "gap-4 text-[44px]" : "gap-2 text-[25px]"
      }`}
      href="/items"
      aria-label="판다마켓 홈"
    >
      <img
        className={
          large ? "h-[58px] w-[58px] rounded-[18px]" : "h-9 w-9 rounded-xl"
        }
        src="/icons/logo.png"
        alt=""
      />
      <span>판다마켓</span>
    </Link>
  );
}
