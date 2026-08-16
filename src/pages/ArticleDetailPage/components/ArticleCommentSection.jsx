import { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { createArticleComment, getArticleComments } from "../../../api/articles";
import { deleteComment, patchComment } from "../../../api/comments";
import { useAuth } from "../../../contexts/AuthContext";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import ToggleMenu from "../../../components/UI/ToggleMenu";
import ConfirmModal from "../../../components/UI/ConfirmModal";
import SeeMoreIcon from "../../../assets/images/icons/ic_kebab.svg?react";
import emptyImage from "../../../assets/images/ui/empty-comments.svg";
import defaultProfileImage from "../../../assets/images/ui/ic_profile.svg";

const Section = styled.section`
  margin-top: 48px;

  > h2 {
    color: var(--gray-900);
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0 32px;

  textarea {
    min-height: 104px;
    padding: 16px;
    border: 0;
    border-radius: 12px;
    outline: 0;
    background: var(--gray-100);
    color: var(--gray-800);
    font-size: 16px;
    line-height: 24px;
    resize: none;

    &::placeholder {
      color: var(--gray-400);
    }

    &:focus {
      outline: 1px solid var(--blue);
    }
  }

  button {
    min-width: 88px;
    min-height: 42px;
    align-self: flex-end;
    padding: 9px 22px;
    border-radius: 8px;
    background: var(--blue);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;

    &:disabled {
      background: var(--gray-400);
      cursor: default;
    }
  }
`;

const Comment = styled.article`
  padding: 24px 0;
  border-bottom: 1px solid var(--gray-200);
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  align-items: flex-start;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  strong {
    display: block;
    color: var(--gray-600);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  time {
    display: block;
    color: var(--gray-400);
    font-size: 12px;
    line-height: 18px;
  }
`;

const CommentContent = styled.p`
  padding-left: 48px;
  color: var(--gray-800);
  font-size: 16px;
  line-height: 26px;
  white-space: pre-wrap;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding-left: 0;
  }
`;

const Empty = styled.div`
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--gray-400);
  font-size: 16px;
  line-height: 24px;

  img {
    width: 188px;
    height: 152px;
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 24px auto 0;
  padding: 10px 18px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
`;

function ArticleCommentSection({ articleId }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryKey = ["articles", articleId, "comments"];

  const commentsQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getArticleComments(articleId, { cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
  const comments = commentsQuery.data?.pages.flatMap((page) => page.list) ?? [];

  const refresh = () => queryClient.invalidateQueries({ queryKey });
  const createMutation = useMutation({
    mutationFn: () => createArticleComment(articleId, content),
    onSuccess: () => { setContent(""); refresh(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, value }) => patchComment(id, { content: value }),
    onSuccess: () => { setEditingId(null); refresh(); },
  });
  const deleteMutation = useMutation({ mutationFn: deleteComment, onSuccess: refresh });

  const submit = (event) => {
    event.preventDefault();
    if (content.trim()) createMutation.mutate();
  };

  return (
    <Section>
      <h2>댓글 달기</h2>
      <Form onSubmit={submit}>
        <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="댓글을 입력해 주세요." />
        <button disabled={!content.trim() || createMutation.isPending}>등록</button>
      </Form>
      {comments.length ? comments.map((comment) => (
        <Comment key={comment.id}>
          <CommentHeader>
            <CommentAuthor>
              <img src={comment.writer.image || defaultProfileImage} alt="" />
              <div>
                <strong>{comment.writer.nickname}</strong>
                <time>{formatUpdatedAt(comment.createdAt)}</time>
              </div>
            </CommentAuthor>
            {user?.id === comment.writer.id && (
              <ToggleMenu
                label="댓글 메뉴"
                options={[{ value: "edit", label: "수정하기" }, { value: "delete", label: "삭제하기" }]}
                onSelect={({ value }) => {
                  if (value === "edit") {
                    setEditingId(comment.id);
                    setEditingContent(comment.content);
                  } else {
                    setDeleteTarget(comment.id);
                  }
                }}
              >
                <SeeMoreIcon />
              </ToggleMenu>
            )}
          </CommentHeader>
          {editingId === comment.id ? (
            <Form onSubmit={(event) => { event.preventDefault(); updateMutation.mutate({ id: comment.id, value: editingContent }); }}>
              <textarea value={editingContent} onChange={(event) => setEditingContent(event.target.value)} />
              <button disabled={!editingContent.trim()}>수정 완료</button>
            </Form>
          ) : <CommentContent>{comment.content}</CommentContent>}
        </Comment>
      )) : (
        <Empty>
          <img src={emptyImage} alt="" />
          <p>아직 댓글이 없습니다.</p>
        </Empty>
      )}
      {commentsQuery.hasNextPage && (
        <LoadMoreButton
          onClick={() => commentsQuery.fetchNextPage()}
          disabled={commentsQuery.isFetchingNextPage}
        >
          {commentsQuery.isFetchingNextPage ? "불러오는 중" : "댓글 더 보기"}
        </LoadMoreButton>
      )}
      <ConfirmModal
        content="정말로 댓글을 삭제하시겠어요?"
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget)}
      />
    </Section>
  );
}

export default ArticleCommentSection;
