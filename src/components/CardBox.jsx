import heartIcon from "../assets/icons/ic_heart.svg";
import "../styles/cardBox.css";
import defaultImg from "../assets/img/img_default.png";

export function CardBox({ product }) {
  const { images, name, price, favoriteCount } = product;

  const imageSetting = images && images.length > 0 ? images[0] : defaultImg;

  return (
    <div className="card-item">
      <div className="image-wrapper">
        <img src={imageSetting} alt="상품 이미지" className="card-image" />
      </div>
      <div className="card-info">
        <div className="card-name">{name}</div>
        <div className="card-price">{price.toLocaleString("ko-KR")}원</div>
        <div className="favorite-section">
          <img src={heartIcon} alt="좋아요 아이콘" />
          <span className="fav-count">{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
