import Link from "next/link"

import { StyledLink } from './Links.style'

export default function Links({ children, href, margins }) {
  return (
    <Link href={href} passHref><StyledLink margins={margins}>{children}</StyledLink></Link>
  )
}