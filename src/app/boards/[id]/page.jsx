// src/app/boards/[id]/page.js
export default async function BoardDetailPage({ params }) {
  const { id } = await params;
  return <h1>게시글 상세 — id: {id}</h1>;
}