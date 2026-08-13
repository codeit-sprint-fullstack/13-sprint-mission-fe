import styled, { css } from 'styled-components';
import DeleteButton from './DeleteButton';
import Label from './Label';
import { ReactComponent as PlusIcon } from '../../assets/images/icons/ic_plus.svg';
import { uploadImage } from '../../api/images';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from './ErrorMessage';

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  ${squareStyles}
`;

const ImagePreview = styled.div`
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: center;
  position: relative;

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

/**
 * 이미지를 서버에 최대 3개까지 업로드하고,
 * 서버에서 받은 이미지 주소를 가지고 값을 변경하는 인풋입니다.
 * 이미지를 업로드하거나 제거할 때마다 배열 값으로 `onChange()`를 실행합니다.
 */
function ImageUpload({ id, label, value = [], onChange }) {
  const uploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (uploadedUrl) => onChange([...value, uploadedUrl]),
  });

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]; // Optional chaining을 사용해 선택된 파일이 있을 경우에만 접근하도록 안전하게 처리

    if (file) {
      uploadMutation.mutate(file);
    }
  };

  const handleDelete = (idx) => {
    const nextValue = [...value.slice(0, idx), ...value.slice(idx + 1)];
    onChange(nextValue);
  };

  const uploadEnabled = value.length < 3;

  return (
    <div aria-busy={uploadMutation.isPending}>
      {label && <Label>{label}</Label>}

      <ImageUploadContainer>
        {uploadEnabled && (
          <>
            <UploadButton htmlFor={id} aria-disabled={uploadMutation.isPending}>
              <PlusIcon />
              이미지 등록
            </UploadButton>

            <HiddenFileInput
              id={id}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </>
        )}

        {value &&
          value.map((url, idx) => (
            <ImagePreview key={url} src={url}>
              <DeleteButtonWrapper>
                <DeleteButton
                  onClick={() => handleDelete(idx)}
                  label="이미지 파일"
                />
              </DeleteButtonWrapper>
            </ImagePreview>
          ))}
      </ImageUploadContainer>
      {uploadMutation.isError && <ErrorMessage>{uploadMutation.error.message}</ErrorMessage>}
    </div>
  );
}

export default ImageUpload;
