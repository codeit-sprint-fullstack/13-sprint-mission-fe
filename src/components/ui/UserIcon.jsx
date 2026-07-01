import Image from "next/image";

export default function UserIcon({ width, height }) {
  return (
    <div className="w-fit h-fit rounded-[100%] bg-secondary-300">
      <Image
        src="/icons/ic_user.svg"
        alt="프로필 아이콘"
        width={width}
        height={height}
      />
    </div>
  );
}
