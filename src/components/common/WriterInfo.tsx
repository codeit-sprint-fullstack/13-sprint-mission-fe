import Image from "next/image";
import defaultProfile from "@/assets/icons/ic_profile.svg";
import dateFormat from "@/utils/dateFormat";
import { PostWriter } from "@/types";

interface WriterInfoProps {
  writer?: PostWriter;
  createdAt: string;
}

export default function WriterInfo({ writer, createdAt }: WriterInfoProps) {
  const formattedDate = dateFormat(createdAt);
  return (
    <div className="text-secondary-600 flex flex-row items-center gap-2 text-[0.875rem] font-normal">
      <div className="relative h-10 w-10">
        <Image
          fill
          className="rounded-full"
          src={writer?.image || defaultProfile}
          alt="기본 프로필"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-secondary-600 text-[0.875rem] font-medium">
          {writer?.nickname || "총명한 판다"}
        </div>
        <div className="text-secondary-400 text-[0.75rem] font-normal">
          {formattedDate}
        </div>
      </div>
    </div>
  );
}
