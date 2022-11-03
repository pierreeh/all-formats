import styled from "styled-components"

import { rem } from "styles/GlobalStyle.style"

export const Paragraph = styled.p`
  font-size: ${({ textSize }) => textSize || rem(16)};
  text-transform: ${({ textUppercase }) => textUppercase ? 'uppercase' : ''};
  text-align: ${({ alignText }) => alignText || ''};
`