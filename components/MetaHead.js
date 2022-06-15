import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from 'next/router';

export default function MetaHead() {

    const router = useRouter()
    const [title, settitle] = useState('Site specific title')
    const [content, setcontent] = useState('Site specific content')

    useEffect(() => {
        switch (router.asPath) {
          case '/': 
            setcontent('Site specific content')
            settitle('Site specific title')
            break;
          default: 
            setcontent('Site specific content')
            settitle('Site specific title')
            break;
        }
    }, [router])

  return (
    <Head>
      <title>Title</title>
      <meta name="theme-color" content="#000000"/>
      <meta name={title} content={content} />
      {/* <link rel="icon" type="image/png" href="/icon-192x192.png" /> */}
    </Head>
  )
}
