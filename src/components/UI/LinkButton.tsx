import { Link } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle, type ButtonStyleProps } from "./Button";

const LinkButton = styled(Link)<ButtonStyleProps>`
  ${buttonStyle}
`;

export default LinkButton;
