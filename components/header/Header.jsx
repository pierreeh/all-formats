import { useRouter } from "next/router"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

import { AvatarContainer, Avatar } from './Header.style'

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useTranslation('common')

  function UserSession() {
    return (
      !!session ? 
        <>
          <AvatarContainer>  
            <Avatar 
              src={session.user.image}
              alt={session.user.name}
              fill
              sizes="100%"
            />
          </AvatarContainer>
          <p>{session.user.name}</p>
          <button type='button' onClick={() => signOut({ callbackUrl: '/' })}>{t('logOut')}</button>
        </> 
      : <Link href="/auth/signin"><a>{t('signIn')}</a></Link>
    )
  }

  return (
    <header>
      <Link href='/'><a>All Formats</a></Link>
      <UserSession />

      {router.locales?.map((l) => (
        <button type="button" key={l} onClick={async () => await setLanguage(l)} disabled={l === router.locale}>{l}</button>
      ))}
    </header>
  )
}