import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TagDisplay from "./TagDisplay";
import LikeButton from "./LikeButton";
import LineDivider from "../../../components/UI/LineDivider";
import ToggleMenu from "../../../components/UI/ToggleMenu";
import ConfirmModal from "../../../components/UI/ConfirmModal";
import { useAuth } from "../../../contexts/AuthContext";
import {
  addProductFavorite,
  deleteProduct,
  deleteProductFavorite,
  getProduct,
} from "../../../api/products";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import SafeImage from "./SafeImage";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const StyledSafeImage = styled(SafeImage)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    aspect-ratio: 1 / 1;
    width: 40%;
    max-width: 486px;
  }
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: flex-start;
`;

const MainDetails = styled.div`
  width: 100%;
  position: relative;
`;

const SeeMoreToggleMenu = styled(ToggleMenu)`
  position: absolute;
  right: 0;
`;

const ItemTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const ItemPrice = styled.h2`
  font-size: 24px;
  font-weight: 600;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 32px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: 40px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 140%;
`;

const SectionLabel = styled.h3`
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const TagDisplaySection = styled.div`
  margin: 24px 0;
`;

function ItemProfileSection({ productId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { data: product, refetch: refetchProduct } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

  const isOwner = !!user && !!product && product.ownerId === user.id;

  const seeMoreOptions = [
    { value: "edit", label: "수정하기" },
    { value: "delete", label: "삭제하기" },
  ];

  const handleSeeMoreSelect = (option) => {
    switch (option.value) {
      case "edit":
        navigate("./edit");
        break;
      case "delete":
        setIsOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/items");
    },
  });
  const likeMutation = useMutation({
    mutationFn: () => product.isLiked
      ? deleteProductFavorite(productId)
      : addProductFavorite(productId),
    onSuccess: () => refetchProduct(),
  });

  if (!product) {
    return null;
  }

  return (
    <SectionContainer>
      <StyledSafeImage
        src={product.images[0]}
        alt={`${product.name} 상품 대표 사진`}
      />

      <ItemDetailsContainer>
        <MainDetails>
          {isOwner && (
            <SeeMoreToggleMenu
              options={seeMoreOptions}
              onSelect={handleSeeMoreSelect}
            >
              <SeeMoreIcon />
            </SeeMoreToggleMenu>
          )}

          <div>
            <ItemTitle>{product.name}</ItemTitle>
            <ItemPrice>{product.price.toLocaleString()}원</ItemPrice>
          </div>

          <LineDivider />

          <div>
            <SectionLabel>상품 소개</SectionLabel>
            <Description>{product.description}</Description>
          </div>

          <TagDisplaySection>
            <SectionLabel>상품 태그</SectionLabel>
            <TagDisplay tags={product.tags} />
          </TagDisplaySection>
        </MainDetails>

        <LikeButton
          isFavorite={product.isLiked}
          favoriteCount={product.favoriteCount ?? 0}
          onClick={() => user && likeMutation.mutate()}
        />
      </ItemDetailsContainer>
      <ConfirmModal
        content="정말 삭제하시겠어요?"
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </SectionContainer>
  );
}

export default ItemProfileSection;
