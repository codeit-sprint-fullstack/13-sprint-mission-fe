import Image from "next/image";

export default function EmptyState({ children }) {
  return (
    <div className="mt-[40px] flex flex-col items-center gap-[37px]">
      <Image src="/ic_empty_ui.svg" alt="Empty UI" width={100} height={99} />
      <p className="text-secondary-400 text-center text-[16px] font-[400]">
        {children}
      </p>
    </div>
  );
}
