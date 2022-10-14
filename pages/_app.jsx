import Head from "next/head"

import { GlobalStyle } from "styles/GlobalStyle.style"

export default function AllFormats({ Component, pageProps }) {
  return (
    <>
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
      
      <Component {...pageProps} />
    </>
  )
}

