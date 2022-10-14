import { useRouter } from "next/router"
import Link from "next/link"
import setLanguage from 'next-translate/setLanguage'

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <Link href='/'><a>All Formats</a></Link>

      {router.locales?.map((l) => (
        <button type="button" key={l} onClick={async () => await setLanguage(l)} disabled={l === router.locale}>{l}</button>
      ))}
    </header>
  )
}