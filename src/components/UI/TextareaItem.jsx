import styled from "styled-components";
import { inputStyle } from "./InputItem";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

const Textarea = styled.textarea`
  ${inputStyle}
  height: 200px;
  resize: none;
`;

function TextareaItem({
  id,
  label,
  error,
  register = {},
  ...inputProps
}) {
  const errorId = id ? `${id}-error` : undefined;

  return (<div>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Textarea
      id={id}
      $error={!!error}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      {...inputProps}
      {...register}
    />
    {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
  </div>
  )
}

export default TextareaItem;
