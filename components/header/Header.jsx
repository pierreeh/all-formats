import { useRouter } from "next/router"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'

import { AvatarContainer, Avatar } from './Header.style'

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  function UserSession() {
    return (
      !!session ? 
        <>
          <AvatarContainer>  
            <Avatar 
              src={session.user.image}
              alt={session.user.name}
              sizes="100vw"
              fill
            />
          </AvatarContainer>
          <p>{session.user.name}</p>
          <button type='button' onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        </> 
      : <Link href="/auth/signin"><a>Sign in</a></Link>
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