import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { initEmailService } from '../lib/EmailService'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Inicializace EmailJS při načtení aplikace
    initEmailService();
  }, []);

  return (
    <>
      <Head>
        <title>Street Cup 2025 | Basketbalový turnaj</title>
        <meta name="description" content="Oficiální stránky basketbalového turnaje Street Cup 2025" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MyApp 