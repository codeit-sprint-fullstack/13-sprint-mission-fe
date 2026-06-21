export default async function EditBoardPage({ params }) {
  const { id } = await params;
  return <h1>게시글 수정 — id: {id}</h1>;
}