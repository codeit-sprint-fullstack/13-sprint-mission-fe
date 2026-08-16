import styled from "styled-components";
import SafeImage from "../../ItemDetailPage/components/SafeImage";
import HeartIcon from "../../../assets/images/icons/ic_heart.svg?react";
import type { Product } from "../../../types/models";

interface ItemCardProps {
  item: Product;
  featured?: boolean;
}

const StyledSafeImage = styled(SafeImage)`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
`;

const Thumbnail = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const BestBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 26px;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blue[0]};
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  box-shadow: 0 2px 6px rgba(17, 24, 39, 0.12);
`;

function ItemCard({ item, featured = false }: ItemCardProps) {
  return (
    <div className="itemCard">
      <Thumbnail>
        <StyledSafeImage
          src={item.images?.[0]}
          alt={`${item.name} 상품 대표 사진`}
        />
        {featured && (
          <BestBadge>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path fill="#FFC83D" d="m6 1.2 1.42 2.88 3.18.46-2.3 2.24.54 3.17L6 8.45 3.16 9.95l.54-3.17-2.3-2.24 3.18-.46L6 1.2Z" />
            </svg>
            Best
          </BestBadge>
        )}
      </Thumbnail>
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{Number(item.price).toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
