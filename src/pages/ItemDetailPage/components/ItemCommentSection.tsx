import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentThread from "./CommentThread";
import CommentForm from "./CommentForm";
import { addProductComment } from "../../../api/products";

const CommentInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const ItemCommentSection = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: (content: string) => addProductComment(productId, { content }),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["products", productId, "comments"],
    }),
  });

  return (
    <>
      <CommentInputSection>
        <SectionTitle>문의하기</SectionTitle>
        <CommentForm defaultValue="" onSubmit={(content) => createCommentMutation.mutateAsync(content)} />
      </CommentInputSection>

      <CommentThread productId={productId} />
    </>
  );
};

export default ItemCommentSection;
