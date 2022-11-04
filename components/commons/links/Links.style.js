import styled from "styled-components"

import { primaryColors } from "../Theme"

export const StyledLink = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${primaryColors.primaryText};
  display: inline-block;
  margin: ${({ margins }) => margins || ''};
`