export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-40">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      <p className="text-md text-gray-400">게시글 불러오는 중...</p>
    </div>
  );
}