import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import styled from "styled-components";
import InputItem from "./InputItem";
import { FlexContainer } from "../../styles/CommonStyles";
import DeleteButton from "./DeleteButton";

const TagButtonsSection = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const Tag = styled(FlexContainer)`
  min-width: 0;
  min-height: 36px;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.black};
  padding: 6px 8px 6px 12px;
  border-radius: 999px;
`;

const TagText = styled.span`
  font-size: 14px;
  line-height: 24px;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface TagInputProps {
  value?: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}

function TagInput({ value = [], onChange, error: formError }: TagInputProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const tags = Array.isArray(value) ? value : [];

  const addTag = (tag: string) => {
    if (tags.includes(tag)) {
      setError("이미 등록한 태그예요.");
      return;
    }
    onChange([...tags, tag]);
  };

  const removeTag = (tagToRemove: string) => {
    const nextTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(nextTags);
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 발생하는 Enter 입력은 태그 등록으로 처리하지 않는다.
    if (event.nativeEvent.isComposing) return;

    const inputString = text.trim();
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputString && !error) {
        addTag(inputString);
        setText("");
        setError("");
      }
    }
  };

  const validateTag = (newTag: string) => {
    if (newTag.length > 5) {
      setError("태그는 5글자 이내로 입력해 주세요.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <InputItem
        label="태그"
        value={text}
        placeholder="태그를 입력해 주세요"
        onKeyDown={handlePressEnter}
        maxLength={6}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
          validateTag(e.target.value);
        }}
        error={error || formError}
      />

      {tags.length > 0 && (
        <TagButtonsSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>

              <DeleteButton
                onClick={() => removeTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;
