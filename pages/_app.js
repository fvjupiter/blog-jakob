import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import ScreenObserver from '../components/ScreenObserver'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [screen, setscreen] = useState({ width: 0, height: 0 })

  return <>
    <Layout>
      <Component {...pageProps} screen={screen} />
      <ScreenObserver setscreen={setscreen} />
    </Layout>
  </>
}

export default MyApp
