export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin" />
      <p className="text-body-md text-gray-500">로딩 중...</p>
    </div>
  );
}
