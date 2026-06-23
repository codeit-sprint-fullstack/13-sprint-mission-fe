import Link from "next/link";

export default function Logo({ large = false }) {
  return (
    <Link
      className={`inline-flex items-center whitespace-nowrap font-black tracking-normal text-[#3692ff] ${large ? "mb-[42px] gap-[18px] text-[40px] tablet:text-[54px]" : "gap-2 text-2xl"}`}
      href="/items"
      aria-label="판다마켓 홈"
    >
      <span
        className={`relative inline-flex flex-none items-center justify-center bg-[#3692ff] ${large ? "h-[62px] w-[62px] rounded-[20px] tablet:h-[78px] tablet:w-[78px]" : "h-[38px] w-[38px] rounded--xl"}`}
        aria-hidden="true"
      >
        <span
          className={`absolute rounded-full bg-[#111827] ${large ? "left-[23px] top-[17px] h-[18px] w-[18px]" : "left-[11px] top-2 h-2.5 w-2.5"}`}
        />
        <span
          className={`absolute rounded-full bg-[#111827] ${large ? "left-[23px] top-[17px] h-[18px] w-[18px]" : "right-[11px] top-2 h-2.5 w-2.5"}`}
        />
        <span
          className={`relative rounded-full bg-rose-50 ${large ? "h-[39px] w-[51px]" : "h-[19px] w-[25px]"}`}
        >
          <span
            className={`absolute rounded-full bg-[#111827] ${large ? "left-2.5 top-3.5 h-3.5 w-[15px]" : "left-[5px] top-[7px] h-[7px] w-2"}`}
          />
          <span
            className={`absolute rounded-full bg-[#111827] ${large ? "right-2.5 top-3.5 h-3.5 w-[15px]" : "left-[5px] top-[7px] h-[7px] w-2"}`}
          />
          <span
            className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#111827] ${large ? "bottom-2.5 h-2 w-3" : "bottom-[5px] h-1 w-1.5"}`}
          />
        </span>
      </span>
    </Link>
  );
}
