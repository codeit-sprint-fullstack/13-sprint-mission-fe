import { useEffect, useState } from "react";
import heart from "../assets/ic_heart.svg";
// import search from "../assets/ic_search.svg";
// import arrow_down from "../assets/ic_arrow_down.svg";
function Products({ keyword = "" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        page: 1,
        pageSize: 4,
        orderBy: "favorite",
        keyword: keyword,
      });

      const res = await fetch(
        `https://panda-market-api.vercel.app/products?${params}`,
      );
      const data = await res.json();

      setProducts(data.list);
    };

    fetchData();
  }, [keyword]);

  return (
    <div className="main-frame">
      <div className="best-frame">
        <span className="what-product">베스트 상품</span>
        <div className="best-inner">
          {products.map((product) => (
            <div className="items-product" key={product.id}>
              <img src={product.images} alt="" className="items-img" />
              <div className="items-explain">
                <div className="best-product-name">
                  <span className="secondary-800-14px">{product.name}</span>
                </div>
                <span className="secondary-800-16px">
                  {product.price.toLocaleString()}원
                </span>
                <div className="product-heart">
                  <img src={heart} alt="하트" className="heart-img" />
                  <span className="secondary-600-12px">
                    {product.favoriteCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sell-frame">
        <div className="search">
          <span className="secondary-900-20px">판매 중인 상품</span>
          <div className="space"></div>
          <div className="search-frame">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="search-inner"
            />
            <button className="search-btn">
              <span className="cool-gray-100-16px">상품 등록하기</span>
            </button>
          </div>
          <select className="search-filter">
            <option value="new">최신순</option>
            <option value="like">좋아요순</option>
            {/* <img src={arrow_down} alt="↓" className="img-24px" /> */}
          </select>
        </div>
        <div className="sell-inner"></div>
      </div>
    </div>
  );
}
export default Products;
