import styled from "styled-components"

export const StyledLink = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin: ${({ margins }) => margins || ''};
`