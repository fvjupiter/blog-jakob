import React, { useEffect, useState } from 'react'
// import { ImageViewer } from '../components/ImageViewer'
import Layout from '../components/layout/Layout'
import ScreenObserver from '../components/ScreenObserver'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isDark, setisDark] = useState(false)
  const setIsDark = isDark => {
    setisDark(isDark)
    localStorage.setItem('isDark', isDark) 
  }
  const toggleMode = () => setIsDark(!isDark)
  
  const [screen, setscreen] = useState({ width: 0, height: 0 })
  const [stories, setstories] = useState([])
  const [poems, setpoems] = useState([])
  const [info, setinfo] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('isDark') != null) {
      setIsDark(localStorage.getItem('isDark') === 'true' ? true : false)
    }
  }, [])

  return <>
    <ScreenObserver setscreen={setscreen} />
    <Layout isDark={isDark} toggleMode={toggleMode} screen={screen} info={info}>
      <Component 
        {...pageProps} 
        screen={screen} 
        isDark={isDark}
        stories={stories}
        setstories={setstories}
        poems={poems}
        setpoems={setpoems}
        info={info}
        setinfo={setinfo}
      />
    </Layout>
  </>
}

export default MyApp
