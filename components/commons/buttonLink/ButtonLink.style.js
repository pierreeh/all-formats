import styled from "styled-components"

import { rem } from "styles/GlobalStyle.style"
import { primaryColors, primaryColorsAlpha } from "components/commons/Theme"

export const Anchor = styled.a`
  text-decoration: none;
  background-color: ${primaryColors.primary};
  color: ${primaryColors.white};
  padding: ${rem(8)} ${rem(16)};
  border-radius: ${rem(4)};
  box-shadow: ${rem(2)} ${rem(2)} ${rem(6)} ${primaryColorsAlpha.primaryText16};
  display: flex;
  align-items: center;
`