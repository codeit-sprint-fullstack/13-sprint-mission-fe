import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ToggleMenu from "../../components/UI/ToggleMenu";
import LinkButton from "../../components/UI/LinkButton";
import ArticleCommentSection from "./components/ArticleCommentSection";
import HeartIcon from "../../assets/images/icons/ic_heart.svg?react";
import SeeMoreIcon from "../../assets/images/icons/ic_kebab.svg?react";
import BackIcon from "../../assets/images/icons/ic_back.svg?react";
import defaultProfileImage from "../../assets/images/ui/ic_profile.svg";

const Page = styled.article`
  width: 100%;
  max-width: 1200px;
  margin: 24px auto 64px;
`;

const Header = styled.header`
  padding-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);
`;

const Top = styled.div`
  position: relative;
  padding-right: 40px;

  h1 {
    color: var(--gray-900);
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
  }
`;

const ArticleMenu = styled(ToggleMenu)`
  position: absolute;
  top: 0;
  right: 0;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
`;

const Author = styled.div`
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

const ArticleBody = styled.div`
  min-height: 220px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 32px 0;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column-reverse;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 220px;
  color: var(--gray-800);
  font-size: 16px;
  line-height: 26px;
  white-space: pre-wrap;
`;

const ArticleImage = styled.img`
  width: 282px;
  max-height: 423px;
  flex: 0 0 auto;
  border-radius: 8px;
  object-fit: cover;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    width: 100%;
    max-height: none;
  }
`;

const FavoriteButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  background: #fff;
  color: ${({ $active }) => ($active ? "var(--red)" : "var(--gray-500)")};
  font-size: 14px;
  line-height: 24px;
`;

const Back = styled(LinkButton)`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  margin: 48px auto 0;
  font-size: 18px;
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
  const menuOptions = [
    { value: "edit", label: "수정하기" },
    { value: "delete", label: "삭제하기" },
  ];

  const handleMenuSelect = ({ value }) => {
    if (value === "edit") navigate(`/community/${articleId}/edit`);
    if (value === "delete") setDeleteOpen(true);
  };

  return (
    <Page>
      <Header>
        <Top>
          <h1>{article.title}</h1>
          {isWriter && (
            <ArticleMenu options={menuOptions} onSelect={handleMenuSelect} label="게시글 메뉴">
              <SeeMoreIcon />
            </ArticleMenu>
          )}
        </Top>
        <MetaRow>
          <Author>
            <img src={article.writer.image || defaultProfileImage} alt="" />
            <div>
              <strong>{article.writer.nickname}</strong>
              <time>{formatUpdatedAt(article.createdAt)}</time>
            </div>
          </Author>
          <FavoriteButton
            type="button"
            $active={article.isLiked}
            aria-pressed={article.isLiked}
            disabled={!user || favoriteMutation.isPending}
            onClick={() => favoriteMutation.mutate()}
          >
            <HeartIcon width="18" height="18" /> {article.favoriteCount ?? 0}
          </FavoriteButton>
        </MetaRow>
      </Header>
      <ArticleBody>
        <Content>{article.content}</Content>
        {article.image && <ArticleImage src={article.image} alt="게시글 첨부 이미지" />}
      </ArticleBody>
      <ArticleCommentSection articleId={articleId} />
      <Back $pill to="/community">
        목록으로 돌아가기
        <BackIcon />
      </Back>
      <ConfirmModal
        content="정말로 게시글을 삭제하시겠어요?"
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </Page>
  );
}

export default ArticleDetailPage;
