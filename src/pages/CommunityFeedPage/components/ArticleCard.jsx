import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import defaultImage from "../../../assets/images/icons/img_default.svg";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";

const Card = styled(Link)`
  display: block;
  min-width: 0;
  padding: 20px;
  border-radius: 12px;
  background: ${({ $featured }) => ($featured ? "var(--gray-50)" : "#fff")};
  border: 1px solid var(--gray-200);
`;

const Body = styled.div`
  display: flex;
  gap: 16px;
  min-height: 96px;
`;

const Text = styled.div`
  flex: 1;
  min-width: 0;
`;

const Badge = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.h3`
  overflow: hidden;
  margin-bottom: 10px;
  color: var(--gray-900);
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.p`
  display: -webkit-box;
  overflow: hidden;
  color: var(--gray-500);
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Thumbnail = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  background: var(--gray-50);
  object-fit: cover;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  color: var(--gray-400);
  font-size: 13px;
`;

const Like = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

function ArticleCard({ article, featured = false }) {
  return (
    <Card to={`/community/${article.id}`} $featured={featured}>
      <Body>
        <Text>
          {featured && <Badge>Best</Badge>}
          <Title>{article.title}</Title>
          <Content>{article.content}</Content>
        </Text>
        <Thumbnail src={article.image || defaultImage} alt="" />
      </Body>
      <Meta>
        <span>{article.writer?.nickname || "판다마켓 사용자"} · {formatUpdatedAt(article.createdAt)}</span>
        <Like><HeartIcon width="16" /> {article.favoriteCount ?? 0}</Like>
      </Meta>
    </Card>
  );
}

export default ArticleCard;
