import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from 'next/router';

export default function MetaHead() {

    const router = useRouter()
    const [title, settitle] = useState('Site specific title')
    const [content, setcontent] = useState('Site specific content')

    useEffect(() => {
        switch (router.asPath) {
          // case '/': 
          //   setcontent('Tauche ein in die wunderbare Welt von Jakob')
          //   settitle('Jakob\'s Blog')
          //   break;
          default: 
            setcontent('Tauche ein in die wunderbare Welt von Jakob und entdecke seine Gedichte, Geschichten, Reiseberichte und Bilder. Viel Spaß!')
            settitle('Jakob\'s Blog')
            break;
        }
    }, [router])

  return (
    <Head>
      <title>{title}</title>
      <meta name="theme-color" content="#000000"/>
      <meta name={title} content={content} />
      {/* <link rel="icon" type="image/png" href="/icon-192x192.png" /> */}
    </Head>
  )
}
