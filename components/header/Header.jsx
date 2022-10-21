import { useRouter } from "next/router"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

import Avatar from "components/commons/avatar/Avatar"

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useTranslation('header')

  function UserSession() {
    return (
      !!session ? 
        <>
          <Avatar 
            src={session.user.image}
            alt={session.user.name}
            fill
            sizes="100%"
          />
          <p>{session.user.name}</p>
          <button type='button' onClick={() => signOut({ callbackUrl: '/' })}>{t('logOut')}</button>
        </> 
      : <Link href="/auth/signin"><a>{t('signIn')}</a></Link>
    )
  }

  return (
    <header>
      <Link href='/'><a>All Formats</a></Link>
      <nav>
        <ul>
          <li><Link href='/forum'><a>{t('forumLink')}</a></Link></li>
        </ul>
      </nav>

      <UserSession />
      {router.locales?.map((l) => (
        <button type="button" key={l} onClick={async () => await setLanguage(l)} disabled={l === router.locale}>{l}</button>
      ))}
    </header>
  )
}