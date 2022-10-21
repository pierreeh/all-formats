import { useRouter } from "next/router"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

import { AvatarContainer, Avatar } from './Header.style'

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useTranslation('header')

  return (
    <header>
      <Link href='/'><a>All Formats</a></Link>
      <nav>
        <ul>
          <li><Link href="/admin"><a>{t('adminLinkHome')}</a></Link></li>
          <li><Link href="/admin/forum/categories"><a>{t('adminLinkForum')}</a></Link></li>
          <li><Link href="/admin/users"><a>{t('adminLinkUsers')}</a></Link></li>
        </ul>
      </nav>
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

      {router.locales?.map((l) => (
        <button type="button" key={l} onClick={async () => await setLanguage(l)} disabled={l === router.locale}>{l}</button>
      ))}
    </header>
  )
}