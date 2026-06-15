export default function BoardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>게시글 상세 페이지 - {params.id}</div>;
}
