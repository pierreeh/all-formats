import Link from "next/link"

import { BreadcrumbContainer, BreadcrumbWrapper, LinkWrapper, StyledLink } from "./Breadcrumb.style"

export default function Breadcrumb({ links, currentPage }) {
  return (
    <BreadcrumbContainer>
      <BreadcrumbWrapper>
        {links.map(l => (
          <LinkWrapper key={l.name}>
            <Link href={l.href} passHref><StyledLink>{l.name}</StyledLink></Link>
          </LinkWrapper>
        ))}  
        <LinkWrapper>{currentPage}</LinkWrapper>
      </BreadcrumbWrapper>
    </BreadcrumbContainer>
  )
}