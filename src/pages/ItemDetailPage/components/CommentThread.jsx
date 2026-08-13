import { useState } from "react";
import styled from "styled-components";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductComments } from "../../../api/products";
import { deleteComment, patchComment } from "../../../api/comments";
import { useAuth } from "../../../contexts/AuthContext";
import LineDivider from "../../../components/UI/LineDivider";
import ToggleMenu from "../../../components/UI/ToggleMenu";
import ConfirmModal from "../../../components/UI/ConfirmModal";
import CommentForm from "./CommentForm";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/ui/empty-comments.svg";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import DefaultProfileImage from "../../../assets/images/ui/ic_profile.svg";

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const StyledToggleMenu = styled(ToggleMenu)`
  position: absolute;
  right: 0;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled.p`
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 4px;
`;

const Timestamp = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 12px;
`;

function CommentItem({ comment, onSubmit }) {
  const { user } = useAuth();
  const [mode, setMode] = useState("view"); // "view" | "edit" | "delete"

  const writer = comment.writer;
  const formattedTimestamp = formatUpdatedAt(comment.updatedAt);
  const isWriter = user && user.id === writer.id;
  const seeMoreOptions = [
    { value: "edit", label: "수정" },
    { value: "delete", label: "삭제" },
  ];

  const handleToggleMenuSelect = (option) => setMode(option.value);

  const handleFormCancel = () => {
    setMode("view");
  };

  const updateMutation = useMutation({
    mutationFn: (content) => patchComment(comment.id, { content }),
    onSuccess: () => {
      onSubmit();
      setMode("view");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      onSubmit();
      setMode("view");
    },
  });

  return (
    <>
      <CommentContainer>
        {mode === "edit" ? (
          <>
            <CommentForm
              defaultValue={comment.content}
              submitLabel="수정 완료"
              onSubmit={(content) => updateMutation.mutateAsync(content)}
              onCancel={handleFormCancel}
            />
          </>
        ) : (
          <>
            {isWriter && (
              <StyledToggleMenu
                options={seeMoreOptions}
                onSelect={handleToggleMenuSelect}
              >
                <SeeMoreIcon />
              </StyledToggleMenu>
            )}

            <CommentContent>{comment.content}</CommentContent>
          </>
        )}

        <AuthorProfile>
          <UserProfileImage
            src={writer.image || DefaultProfileImage}
            alt={`${writer.nickname}님의 프로필 사진`}
          />

          <div>
            <Username>{writer.nickname}</Username>
            <Timestamp>{formattedTimestamp}</Timestamp>
          </div>
        </AuthorProfile>
      </CommentContainer>

      <ConfirmModal
        content="정말 삭제하시겠습니까?"
        isOpen={mode === "delete"}
        onConfirm={() => deleteMutation.mutate()}
        onClose={() => setMode()}
      />

      <LineDivider $margin="0" />
    </>
  );
}

const EmptyStateContainer = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 16px;
  line-height: 24px;
`;

function EmptyState() {
  return (
    <EmptyStateContainer>
      <EmptyStateImage />
      <EmptyStateText>아직 문의가 없습니다.</EmptyStateText>
    </EmptyStateContainer>
  );
}

const ThreadContainer = styled.div`
  margin-bottom: 40px;
`;

const MoreButton = styled.button`
  display: block;
  margin: 24px auto 0;
  color: ${({ theme }) => theme.colors.blue[0]};
`;

function CommentThread({ productId }) {
  const queryClient = useQueryClient();
  const queryKey = ["products", productId, "comments"];
  const commentsQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getProductComments({
        productId,
        params: { limit: 10, cursor: pageParam },
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!productId,
  });
  const comments = commentsQuery.data?.pages.flatMap((page) => page.list) ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey });

  if (commentsQuery.isPending) return null;
  if (commentsQuery.isError) return <EmptyStateText>{commentsQuery.error.message}</EmptyStateText>;

  if (comments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ThreadContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onSubmit={refresh} />
      ))}
      {commentsQuery.hasNextPage && (
        <MoreButton
          type="button"
          onClick={() => commentsQuery.fetchNextPage()}
          disabled={commentsQuery.isFetchingNextPage}
        >
          {commentsQuery.isFetchingNextPage ? "불러오는 중" : "댓글 더 보기"}
        </MoreButton>
      )}
    </ThreadContainer>
  );
}

export default CommentThread;
