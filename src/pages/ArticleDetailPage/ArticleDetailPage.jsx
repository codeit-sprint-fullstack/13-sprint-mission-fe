import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import {
  addArticleFavorite,
  deleteArticle,
  getArticle,
  removeArticleFavorite,
} from "../../api/articles";
import { useAuth } from "../../contexts/AuthContext";
import { formatUpdatedAt } from "../../utils/dateUtils";
import ConfirmModal from "../../components/UI/ConfirmModal";
import ArticleCommentSection from "./components/ArticleCommentSection";
import { ReactComponent as HeartIcon } from "../../assets/images/icons/ic_heart.svg";

const Page = styled.article`
  max-width: 900px;
  margin: 24px auto 64px;
`;

const Header = styled.header`
  padding-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Meta = styled.p`
  margin-top: 16px;
  color: var(--gray-400);
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  color: var(--blue);
`;

const Content = styled.div`
  min-height: 220px;
  padding: 32px 0;
  white-space: pre-wrap;
  line-height: 1.7;
`;

const FavoriteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  color: ${({ $active }) => ($active ? "var(--blue)" : "var(--gray-500)")};
`;

const Back = styled(Link)`
  display: block;
  width: fit-content;
  margin: 48px auto 0;
  color: var(--blue);
  font-weight: 600;
`;

function ArticleDetailPage() {
  const { articleId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const queryKey = ["articles", articleId];
  const articleQuery = useQuery({ queryKey, queryFn: () => getArticle(articleId) });
  const article = articleQuery.data;

  const deleteMutation = useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/community");
    },
  });
  const favoriteMutation = useMutation({
    mutationFn: () => article.isLiked
      ? removeArticleFavorite(articleId)
      : addArticleFavorite(articleId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  if (articleQuery.isPending) return <Page>게시글을 불러오는 중입니다.</Page>;
  if (articleQuery.isError) return <Page>{articleQuery.error.message}</Page>;

  const isWriter = user?.id === article.writer.id;

  return (
    <Page>
      <Header>
        <Top>
          <h1>{article.title}</h1>
          {isWriter && (
            <Actions>
              <Link to={`/community/${articleId}/edit`}>수정</Link>
              <button onClick={() => setDeleteOpen(true)}>삭제</button>
            </Actions>
          )}
        </Top>
        <Meta>{article.writer.nickname} · {formatUpdatedAt(article.createdAt)}</Meta>
      </Header>
      <Content>{article.content}</Content>
      <FavoriteButton $active={article.isLiked} onClick={() => favoriteMutation.mutate()}>
        <HeartIcon width="18" /> {article.favoriteCount ?? 0}
      </FavoriteButton>
      <ArticleCommentSection articleId={articleId} />
      <Back to="/community">목록으로 돌아가기 →</Back>
      <ConfirmModal
        content="게시글을 삭제하시겠습니까?"
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </Page>
  );
}

export default ArticleDetailPage;
