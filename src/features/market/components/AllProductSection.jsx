import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import HeaderArea from "./HeaderArea";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

function AllProductSection() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("recent");
  const [pageSize, setPageSize] = useState(getPageSize());

  const { data = [], totalCount } = useProducts({
    page,
    pageSize,
    keyword,
    sort,
  });

  const [likedMap, setLikedMap] = useState({});

  const handleLike = (id) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1);
  };

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedProducts = [...data].sort((a, b) => {
    if (sort === "favorite") {
      return b.favorite - a.favorite;
    }
    return new Date(b.createAt) - new Date(a.createAt);
  });

  return (
    <section>
      <HeaderArea
        keyword={keyword}
        onSearch={handleSearch}
        onSortChange={handleSortChange}
      />

      <ProductGrid
        products={sortedProducts}
        type="all"
        onLike={handleLike}
        likedMap={likedMap}
      />

      <Pagination
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </section>
  );
}

function getPageSize() {
  if (window.innerWidth >= 1024) return 10;
  if (window.innerWidth >= 768) return 6;
  return 4;
}

export default AllProductSection;
