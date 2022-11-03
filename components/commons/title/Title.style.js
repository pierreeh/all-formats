import styled from "styled-components"

import { rem } from "styles/GlobalStyle.style"

export const StyledTitle = styled.h1`
  font-size: ${({ textSize }) => textSize || rem(24)};
  margin: ${({ margins }) => margins || ''};
`