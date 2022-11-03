import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Header from "components/header/Header"
import Footer from "components/footer/Footer"
import { SiteContainer } from './Layout.style'

const AdminHeader = dynamic(() => import("components/admin/header/Header"), { suspense: true })

function MainHeader() {
  const router = useRouter() 
  const { data: session } = useSession()

  return (
    session?.user.role === 'ADMIN' && router.route.startsWith('/admin') ?
      <Suspense fallback={<div>Loading...</div>}>
        <AdminHeader />
      </Suspense>
    : <Header />
  )
}

export default function Layout({ children }) {
  return (
    <>
      <div>
        <MainHeader />
        <SiteContainer>{children}</SiteContainer>
      </div>
      
      <Footer />
    </>
  )
}