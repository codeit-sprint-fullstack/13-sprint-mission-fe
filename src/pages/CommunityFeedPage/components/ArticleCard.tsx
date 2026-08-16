import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import defaultImage from "../../../assets/images/icons/img_default.svg";
import HeartIcon from "../../../assets/images/icons/ic_heart.svg?react";
import type { Article } from "../../../types/models";

interface FeaturedProps {
  $featured: boolean;
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const Card = styled(Link)<FeaturedProps>`
  display: block;
  min-width: 0;
  padding: 16px 0;
  border-bottom: 1px solid var(--gray-200);
  background: #fff;

  ${({ $featured }) => $featured && css`
    min-height: 169px;
    padding: 24px;
    border: 0;
    border-radius: 8px;
    background: var(--gray-50);
  `}

  &:hover h3 {
    color: var(--blue);
  }
`;

const Body = styled.div<FeaturedProps>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: ${({ $featured }) => ($featured ? "82px" : "48px")};
`;

const Text = styled.div`
  flex: 1;
  min-width: 0;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
`;

const Title = styled.h3<FeaturedProps>`
  display: -webkit-box;
  overflow: hidden;
  color: var(--gray-900);
  font-size: ${({ $featured }) => ($featured ? "18px" : "16px")};
  font-weight: 600;
  line-height: ${({ $featured }) => ($featured ? "26px" : "24px")};
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $featured }) => ($featured ? 2 : 1)};
`;

const Thumbnail = styled.img<FeaturedProps>`
  width: ${({ $featured }) => ($featured ? "72px" : "48px")};
  height: ${({ $featured }) => ($featured ? "72px" : "48px")};
  flex: 0 0 auto;
  border-radius: 8px;
  background: var(--gray-100);
  object-fit: cover;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  color: var(--gray-400);
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
`;

const Like = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 4px;
`;

function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Card to={`/community/${article.id}`} $featured={featured}>
      <Body $featured={featured}>
        <Text>
          {featured && (
            <Badge>
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                <path fill="#FFC83D" d="m6 1.2 1.42 2.88 3.18.46-2.3 2.24.54 3.17L6 8.45 3.16 9.95l.54-3.17-2.3-2.24 3.18-.46L6 1.2Z" />
              </svg>
              Best
            </Badge>
          )}
          <Title $featured={featured}>{article.title}</Title>
        </Text>
        <Thumbnail
          $featured={featured}
          src={article.image || defaultImage}
          alt={article.image ? `${article.title} 게시글 이미지` : ""}
        />
      </Body>
      <Meta>
        <span>{article.writer?.nickname || "판다마켓 사용자"} · {formatUpdatedAt(article.createdAt)}</span>
        <Like><HeartIcon width="16" height="16" /> {article.favoriteCount ?? 0}</Like>
      </Meta>
    </Card>
  );
}

export default ArticleCard;
