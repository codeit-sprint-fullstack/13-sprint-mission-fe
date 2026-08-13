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
  return (<div>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Textarea
      id={id}
      $error={!!error}
      {...inputProps}
      {...register}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
  )
}

export default TextareaItem;
