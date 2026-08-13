import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../styles/CommonStyles";
import ItemProfileSection from "./components/ItemProfileSection";
import ItemCommentSection from "./components/ItemCommentSection";
import { ReactComponent as BackIcon } from "../../assets/images/icons/ic_back.svg";
import LinkButton from "../../components/UI/LinkButton";
import LineDivider from "../../components/UI/LineDivider";

const BackToMarketPageLink = styled(LinkButton)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

function ItemDetailPage() {
  const { itemId: productId } = useParams();

  if (!productId) return null;

  return (
    <Container>
      <ItemProfileSection productId={productId} />

      <LineDivider />

      <ItemCommentSection productId={productId} />

      {/* BackToMarketPageLink의 베이스인 LinkButton에 $pill boolean 값을 전달 */}
      <BackToMarketPageLink $pill to="/items">
        목록으로 돌아가기
        <BackIcon />
      </BackToMarketPageLink>
    </Container>
  );
}

export default ItemDetailPage;
