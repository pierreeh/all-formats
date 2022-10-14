import Head from "next/head"
import { SessionProvider } from "next-auth/react"

import Layout from "components/layout/Layout"
import { GlobalStyle } from "styles/GlobalStyle.style"

function AllFormats({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta key="robots" name="robots" content="index,follow" />
        <meta key="googlebot" name="googlebot" content="index,follow" />
        
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1,initial-scale=1,width=device-width,shrink-to-fit=no,viewport-fit=cover"
        />
      </Head>
      <GlobalStyle />
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default AllFormats

