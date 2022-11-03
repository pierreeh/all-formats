import styled from "styled-components"

import { breakpoints } from "components/commons/Theme"
import { rem } from "styles/GlobalStyle.style"

export const BreadcrumbContainer = styled.aside`
  @media (max-width: ${breakpoints.mobile}px) {
    display: none;
  }
`

export const BreadcrumbWrapper = styled.ul`
  display: flex;
`

export const LinkWrapper = styled.li`
  font-size: ${rem(12)};

  &:last-child {
    &:after {
      content: '';
    }
  }

  &:after {
    content: '>';
    margin: 0 ${rem(8)};
  }
`

export const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 600;
`