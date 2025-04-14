import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Street Cup 2025 | Basketbalový turnaj</title>
        <meta name="description" content="Oficiální stránky basketbalového turnaje Street Cup 2025" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 