import { useParams } from "react-router-dom";

function ItemDetailPage() {
  const { id } = useParams();

  return <div>상품 상세 페이지: {id}</div>;
}

export default ItemDetailPage;
