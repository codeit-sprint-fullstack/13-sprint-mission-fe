export default function Card({ product }) {
  return product.map((p) => {
    return (
      <li key={p.id} className="sale-product">
        <img
          src="./src/assets/img_default.svg"
          alt="제품 이미지"
          className="main-img"
        />
        <p className="product-name">{p.name}</p>
        <p className="price">{p.price}원</p>

        <div className="favorite">
          <img src="./src/assets/ic_heart.svg" alt="하트" />
          <p>{p.favoriteCount}</p>
        </div>
      </li>
    );
  });
}
