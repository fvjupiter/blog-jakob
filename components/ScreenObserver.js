import React, { useRef, useEffect } from 'react'

//calls setscreen on screenSizeChange, with {width: x, height: y}
export default function ScreenObserver({ setscreen }) {

    const screenRef = useRef()

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setscreen({ width: entries[0].contentRect.width, height: entries[0].contentRect.height })
        })
        observer.observe(screenRef.current)
        return () => screenRef.current && observer.unobserve(screenRef.current)
    }, [])

  return <div className='h-screen w-screen fixed -z-50' ref={screenRef}/>

}
