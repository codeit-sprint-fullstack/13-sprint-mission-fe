import useProducts from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";

function BsetProductSection() {
  const { data } = useProducts({
    page: 1,
    pageSize: 20,
    sort: "favorite",
    keyword: "",
  });

  const bestProducts = [...data]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);
  return (
    <section>
      <h2>베스트 상품</h2>
      <ProductGrid products={bestProducts} type="best" />
    </section>
  );
}

export default BsetProductSection;
