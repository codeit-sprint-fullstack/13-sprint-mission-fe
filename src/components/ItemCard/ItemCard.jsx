import "../../styles/itemCard.css";

export function ItemCard({ product }) {
  // price가 없을 경우를 대비해 기본값 처리를 해줍니다.
  const { images, name, price = 0, favoriteCount } = product;

  // 이미지가 깨졌을 때(에러 발생 시) 실행될 대체 함수
  const handleImageError = (e) => {
    e.target.src = "/logo.svg"; // 프로젝트 public 폴더에 있는 판다마켓 로고로 대체
    e.target.className = "item-image fallback-image"; // 대체 이미지용 클래스 추가
  };

  return (
    <div className="item-card-container">
      <div className="item-image-wrapper">
        <img 
          src={images?.[0] || "/logo.svg"} 
          alt={name} 
          className="item-image" 
          onError={handleImageError}
        />
      </div>
      <div className="item-info">
        <div className="item-name">{name}</div>
        <div className="item-price">{price.toLocaleString("ko-KR")}원</div>
        <div className="item-favorite-section">
          <img src="/ic_heart.svg" alt="좋아요 아이콘" className="heart-icon" />
          <span className="item-fav-count">{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}