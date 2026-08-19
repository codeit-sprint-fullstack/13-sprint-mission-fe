export default function BoardEditPage({ params }: { params: { id: string } }) {
  return <div>게시글 수정 페이지 - {params.id}</div>;
}
