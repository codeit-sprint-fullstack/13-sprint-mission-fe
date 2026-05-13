import { useState } from "react";
// Vite에서 이미지를 import하면 빌드 시 적절한 URL로 자동 변환됨.
// no-image.png는 API 이미지 URL이 깨졌을 때 보여줄 fallback.
import noImage from "../../assets/images/no-image.png";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  // props로 받은 product 객체에서 필요한 필드만 꺼냄 (디스트럭처링).
  const { images, name, price, favoriteCount } = product;

  // 이미지 로드 실패 여부를 state로 추적.
  // false → 원본 이미지 시도, true → fallback 이미지 사용.
  const [imgError, setImgError] = useState(false);

  // 두 가지 경우에 fallback 사용:
  // 1. imgError: 원본 로드 실패 (onError 발동)
  // 2. !images?.[0]: API에서 받은 images 배열이 비어있거나 없음
  // ?. (optional chaining): images가 undefined여도 에러 안 남.
  const src = imgError || !images?.[0] ? noImage : images[0];

  return (
    // <article>: 독립적인 콘텐츠 단위라는 의미를 가진 시맨틱 태그.
    <article className={styles.card}>
      <div className={styles.imageBox}>
        <img
          src={src}
          alt={name}
          className={styles.image}
          // 이미지 로드 실패 시 자동 호출되는 이벤트 핸들러.
          // 한 번 setImgError(true) 되면 src가 fallback으로 바뀜.
          onError={() => setImgError(true)}
        />
      </div>
      <h3 className={styles.name}>{name}</h3>
      {/* toLocaleString(): 21000 → "21,000" 처럼 천 단위 콤마 자동 추가 */}
      <p className={styles.price}>{price.toLocaleString()}원</p>
      <p className={styles.favorite}>
        {/* aria-hidden: 스크린리더가 "하트" 같은 이상한 발음 안 하게 숨김 (장식용) */}
        <span className={styles.heart} aria-hidden="true">
          ♡
        </span>
      </p>
    </article>
  );
}
