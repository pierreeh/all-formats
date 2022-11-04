import Link from "next/link"

import { Anchor } from "./ButtonLink.style"

export default function ButtonLink({ children, href }) {
  return (
    <Link href={href} passHref><Anchor>{children}</Anchor></Link>
  )
}