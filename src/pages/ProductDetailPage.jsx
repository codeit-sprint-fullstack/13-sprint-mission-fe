import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {id}</p>
      <p>(sprint5 요구사항: 빈 페이지)</p>
    </main>
  );
}
