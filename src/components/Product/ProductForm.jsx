import styled from "styled-components";
import Button from "../UI/Button";
import ImageUpload from "../UI/ImageUpload";
import InputItem from "../UI/InputItem";
import TagInput from "../UI/TagInput";
import TextareaItem from "../UI/TextareaItem";
import {
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MIN,
} from "../../hooks/useProductFormValidation";
import {
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";

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

function ProductForm({
  title,
  values,
  errors,
  isSubmitting,
  canSubmit,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <TitleSection>
        <SectionTitle>{title}</SectionTitle>
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          isLoading={isSubmitting}
        >
          등록
        </Button>
      </TitleSection>

      <InputSection>
        <ImageUpload
          id="images"
          label="상품 이미지"
          value={values.images}
          onChange={(images) => onChange("images", images)}
        />
        <InputItem
          id="name"
          label="상품명"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="상품명을 입력해 주세요"
          error={errors.name}
        />
        <TextareaItem
          id="description"
          label="상품 소개"
          value={values.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="상품 소개를 입력해 주세요"
          error={errors.description}
        />
        <InputItem
          id="price"
          label="판매 가격"
          value={values.price}
          type="text"
          inputMode="numeric"
          min={PRODUCT_PRICE_MIN}
          max={PRODUCT_PRICE_MAX}
          maxLength={10}
          onChange={(event) => onChange("price", event.target.value)}
          placeholder="판매 가격을 입력해 주세요"
          error={errors.price}
        />
        <TagInput
          value={values.tags}
          error={errors.tags}
          onChange={(tags) => onChange("tags", tags)}
        />
      </InputSection>
    </form>
  );
}

export default ProductForm;
