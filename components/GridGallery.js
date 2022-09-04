import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import Home from '../public/img/home.jpeg'

export default function GridGallery({ imgArr, setImgId, screen }) {

    const [colWidth, setcolWidth] = useState(screen.width > 1024 ? screen.width * (121/12) / 3 : screen.width / 3)
    
    const [col1, setcol1] = useState([])
    const [col2, setcol2] = useState([])
    const [col3, setcol3] = useState([])
    const [col4, setcol4] = useState([])

    useEffect(() => {
        setcolWidth(screen.width > 1024 ? (screen.width) * (9/12) / 3 : (screen.width) / 3)
    }, [screen])

    useEffect(() => {
        setcol1([])
        setcol2([])
        setcol3([])
        for (let i = 0; i < imgArr.length; i+=3) { 
            if(imgArr[i]) setcol1(prev => [...prev,  <ImgCard key={i} index={i} img={imgArr[i]}/>])
            if(imgArr[i+1]) setcol2(prev => [...prev, <ImgCard key={i+1} index={i+1} img={imgArr[i+1]}/>])
            if(imgArr[i+2]) setcol3(prev => [...prev, <ImgCard key={i+2} index={i+2} img={imgArr[i+2]}/>])
            // if(imgArr[i+3]) setcol4(prev => [...prev, <ImgCard key={i+3} index={i+3} src={imgArr[i+3]}/>])
        }
    }, [colWidth])

    const ImgCard = ({ index, img }) => (
        <div 
            key={index} 
            onClick={() => setImgId(index)}
            className='mb-0.5 mx-1 lg:mb-9 lg:mx-5 w-fit group overflow-hidden duration-300 cursor-pointer'
            >
                <Image 
                    width={colWidth}
                    height={img.height / img.width * colWidth}
                        
                    src={`https:${img.src}`} 
                    // placeholder="blur" 
                    // blurDataURL={Home} 
                    className='group-hover:scale-110 group-active:scale-100 scale-100 duration-300'
                />
                
                {/* <img src={`https:${img.src}`} className='group-hover:scale-110 group-active:scale-100 duration-300'/> */}
        </div>
    )

  return <>
    <div className='flex mx-0.5 lg:mx-auto lg:w-9/12'>
        <div style={{ width: colWidth }} >{col1}</div>
        <div style={{ width: colWidth }} >{col2}</div>
        <div style={{ width: colWidth }} >{col3}</div>
        {/* <div className='w-1/4'>{col4}</div> */}
    </div>
  </>
}
