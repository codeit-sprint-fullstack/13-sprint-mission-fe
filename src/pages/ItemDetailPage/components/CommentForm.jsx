import { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../../../components/UI/Button";
import TextareaItem from "../../../components/UI/TextareaItem";

const COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
`;

function CommentForm({
  defaultValue,
  submitLabel = "등록",
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange", defaultValues: { content: defaultValue } });

  const enhancedOnSubmit = async ({ content }) => {
    await onSubmit(content);
    reset({ content: defaultValue });
  };

  useEffect(() => {
    reset({ content: defaultValue });
  }, [defaultValue, reset]);

  return (
    <Form onSubmit={handleSubmit(enhancedOnSubmit)}>
      <TextareaItem
        id="content"
        placeholder={COMMENT_PLACEHOLDER}
        register={register("content", {
          required: true,
        })}
      />
      <Footer>
        <Button disabled={!isValid}>{submitLabel}</Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} $appearance="secondary">
            취소
          </Button>
        )}
      </Footer>
    </Form>
  );
}

export default CommentForm;
