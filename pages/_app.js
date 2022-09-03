import React, { useState } from 'react'
// import { ImageViewer } from '../components/ImageViewer'
import Layout from '../components/layout/Layout'
import ScreenObserver from '../components/ScreenObserver'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isDark, setisDark] = useState(false)
  const toggleMode = () => setisDark(!isDark)
  const [screen, setscreen] = useState({ width: 0, height: 0 })
  const [stories, setstories] = useState([])
  const [poems, setpoems] = useState([])
  const [info, setinfo] = useState(null)

  return <>
    <ScreenObserver setscreen={setscreen} />
    {/* <ImageViewer
      imgArr={imgArrFullscreen} 
      isFSVisible={isFSVisible} 
      setisFSVisible={setisFSVisible} 
      imgId={imgIdFullscreen} 
      setImgIdFullscreen={setImgIdFullscreen}
    /> */}
    <Layout isDark={isDark} screen={screen} info={info}>
      <Component 
        {...pageProps} 
        screen={screen} 
        isDark={isDark} 
        toggleMode={toggleMode}
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
