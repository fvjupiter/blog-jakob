import { useEffect, useRef } from "react";
import { BsX } from "react-icons/bs";
import Loader from "./Loader";

export default function Map({ isMapOpen, setIsMapOpen, loc }) {

    const topRef = useRef(null)
    useEffect(() => {
        if (topRef && topRef.current) {
            topRef.current.scrollIntoView()
        }
    }, [isMapOpen])

  return <>
    <div onClick={() => setIsMapOpen(false)} 
        className={`${isMapOpen ? 'visible' : 'hidden'} fixed inset-0 backdrop bg-black/60 center z-[1000] cursor-alias p-2 pt-12 sm:p-8 sm:py-10`}
        >
        <div style={{ border: '2px solid blue' }} 
            onClick={(e) => e.stopPropagation()}
            className={`relative
                w-full h-full
                bg-stone-800 text-white
                rounded-3xl shadow-2xl shadow-black
                ring ring-white/30
                max-h-screen overflow-y-scroll
                cursor-default
            `}>
            <div ref={topRef} className={`absolute top-0`}/>
            <div className={`text-center h-full w-full`}>
                <BsX className="fixed left-0 top-0 mt-2 ml-2 cursor-pointer text-gray-300 hover:text-white" onClick={() => setIsMapOpen(false)} size={30}/>
                <div className='absolute h-full w-full center'><Loader /></div>
                {loc.lat && loc.lon 
                && <iframe
                    className={`absolute w-full h-full z-10`}
                    src={`https://maps.google.com/maps?q=${loc.lat},${loc.lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />}
            </div>
        </div>
    </div>
  </>
}
