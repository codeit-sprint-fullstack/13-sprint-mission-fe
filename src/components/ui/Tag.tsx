interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <div className="bg-cool-gray-100 flex h-9 items-center justify-center rounded-[26px] px-4 py-1.5">
      <span className="text-secondary-800 text-sm font-normal">#{name}</span>
    </div>
  );
}
