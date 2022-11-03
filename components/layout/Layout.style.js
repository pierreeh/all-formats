import styled from "styled-components"

import { breakpoints } from "components/commons/Theme"

export const SiteContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr min(90%, ${breakpoints.mobile}px) 1fr;

  > :not(.full-bleed) {
    grid-column: 2;
  }

  @media (min-width: ${breakpoints.laptop}px) {
    grid-template-columns: 1fr min(80%, ${breakpoints.desktop}px) 1fr;
  }
`