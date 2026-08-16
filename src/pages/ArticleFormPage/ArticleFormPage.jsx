import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { createArticle, getArticle, updateArticle } from "../../api/articles";
import Button from "../../components/UI/Button";
import ImageUpload from "../../components/UI/ImageUpload";

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 24px auto 64px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h1 {
    color: var(--gray-900);
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  button {
    min-width: 88px;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
  color: var(--gray-900);
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;

  input, textarea {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 12px;
    outline: 0;
    background: var(--gray-100);
    padding: 15px 24px;
    color: var(--gray-800);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    &:focus {
      border-color: var(--blue);
    }

    &::placeholder {
      color: var(--gray-400);
    }
  }

  input { min-height: 56px; }
  textarea { min-height: 240px; resize: none; }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 16px;
  }
`;

const ErrorText = styled.p`
  margin-top: 16px;
  color: #f74747;
`;

function ArticleFormPage() {
  const { articleId } = useParams();
  const isEdit = Boolean(articleId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const articleQuery = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticle(articleId),
    enabled: isEdit,
  });

  useEffect(() => {
    if (articleQuery.data) {
      setTitle(articleQuery.data.title);
      setContent(articleQuery.data.content);
      setImages(articleQuery.data.image ? [articleQuery.data.image] : []);
    }
  }, [articleQuery.data]);

  const mutation = useMutation({
    mutationFn: () => isEdit
      ? updateArticle(articleId, { title, content, image: images[0] ?? null })
      : createArticle({ title, content, image: images[0] ?? null }),
    onSuccess: (article) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate(`/community/${article.id}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header>
        <h1>{isEdit ? "게시글 수정" : "게시글 쓰기"}</h1>
        <Button type="submit" disabled={!title.trim() || !content.trim()} isLoading={mutation.isPending}>
          {isEdit ? "수정" : "등록"}
        </Button>
      </Header>
      <Field>
        *제목
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목을 입력해 주세요" />
      </Field>
      <Field>
        *내용
        <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="내용을 입력해 주세요" />
      </Field>
      <ImageUpload
        id="article-image"
        label="이미지"
        value={images}
        onChange={setImages}
        maxImages={1}
      />
      {mutation.isError && <ErrorText>{mutation.error.message}</ErrorText>}
    </Form>
  );
}

export default ArticleFormPage;
