import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import { addProduct } from "../../api/products";
import TextareaItem from "../../components/UI/TextareaItem";
import Button from "../../components/UI/Button";
import ImageUpload from "../../components/UI/ImageUpload";
import useProductFormValidation from "../../hooks/useProductFormValidation";

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { errors, validateField, validateForm } = useProductFormValidation();
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/items");
    },
  });

  // 상품 등록 API 호출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: Number(price), // 숫자형으로 변환
      tags,
      images,
    };

    if (!validateForm(productData)) return;
    createProductMutation.mutate(productData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button
            type="submit"
            disabled={
              !name || !description || !price || !tags.length ||
              Object.values(errors).some(Boolean) || createProductMutation.isPending
            }
            isLoading={createProductMutation.isPending}
          >
            등록
          </Button>
        </TitleSection>

        <InputSection>
          {/* useState를 사용해서 이미지 업로드 인풋을 활용하는 예시입니다. */}
          <ImageUpload
            id="images"
            label="상품 이미지"
            value={images}
            onChange={setImages}
          />
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name} // 에러 메시지 전달
          />

          <TextareaItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateField("description", e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            error={errors.description} // 에러 메시지 전달
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validateField("price", e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price} // 에러 메시지 전달
          />

          <TagInput
            value={tags}
            error={errors.tags}
            onChange={(nextTags) => {
              setTags(nextTags);
              validateField("tags", nextTags);
            }}
          />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;
