import { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { createArticleComment, getArticleComments } from "../../../api/articles";
import { deleteComment, patchComment } from "../../../api/comments";
import { useAuth } from "../../../contexts/AuthContext";
import { formatUpdatedAt } from "../../../utils/dateUtils";

const Section = styled.section`
  margin-top: 48px;
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
    background: var(--gray-50);
    resize: vertical;
  }

  button {
    align-self: flex-end;
    padding: 10px 22px;
    border-radius: 8px;
    background: var(--blue);
    color: #fff;
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
  color: var(--gray-500);
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  color: var(--blue);
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
            <span>{comment.writer.nickname} · {formatUpdatedAt(comment.createdAt)}</span>
            {user?.id === comment.writer.id && (
              <Actions>
                <button onClick={() => { setEditingId(comment.id); setEditingContent(comment.content); }}>수정</button>
                <button onClick={() => deleteMutation.mutate(comment.id)}>삭제</button>
              </Actions>
            )}
          </CommentHeader>
          {editingId === comment.id ? (
            <Form onSubmit={(event) => { event.preventDefault(); updateMutation.mutate({ id: comment.id, value: editingContent }); }}>
              <textarea value={editingContent} onChange={(event) => setEditingContent(event.target.value)} />
              <button disabled={!editingContent.trim()}>수정 완료</button>
            </Form>
          ) : <p>{comment.content}</p>}
        </Comment>
      )) : <p>아직 댓글이 없습니다.</p>}
      {commentsQuery.hasNextPage && (
        <LoadMoreButton
          onClick={() => commentsQuery.fetchNextPage()}
          disabled={commentsQuery.isFetchingNextPage}
        >
          {commentsQuery.isFetchingNextPage ? "불러오는 중" : "댓글 더 보기"}
        </LoadMoreButton>
      )}
    </Section>
  );
}

export default ArticleCommentSection;
