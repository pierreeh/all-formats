import styled from "styled-components"

import { primaryColorsAlpha } from "components/commons/Theme"
import { rem } from "./GlobalStyle.style"

export const IndexCategories = styled.li`
  margin-bottom: ${rem(32)};
  padding-bottom: ${rem(24)};
  border-bottom: ${rem(1)} solid ${primaryColorsAlpha.primaryText16};

  &:first-child {
    margin-top: ${rem(32)};
  }

  &:last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

export const IndexDescriptions = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 2fr;
  margin-bottom: ${rem(16)};
`

export const IndexSubCategories = styled.li`
  display: grid;
  grid-template-columns: 5fr 1fr 2fr;
  margin-bottom: ${rem(24)};
`