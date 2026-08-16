import styled from "styled-components";

const TagsDisplaySection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[600]};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
`;

function TagDisplay({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <TagsDisplaySection>
      {tags.map((tag) => (
        <Tag key={`tag-display-${tag}`}>#{tag}</Tag>
      ))}
    </TagsDisplaySection>
  );
}

export default TagDisplay;
