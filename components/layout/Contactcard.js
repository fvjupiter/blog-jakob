import { useEffect, useRef } from "react";
import { BsX } from "react-icons/bs";

export default function Contactcard({ screen, isContact, setisContact }) {
    const topRef = useRef(null)
    useEffect(() => {
        if (topRef && topRef.current) {
            topRef.current.scrollIntoView()
        }
    }, [isContact])
  return <>
    <div onClick={() => setisContact(false)} 
        className={`${isContact ? 'visible' : 'hidden'} fixed inset-0 backdrop bg-black/60 center z-[1000] cursor-alias`}
        >
        <div style={{ maxHeight: screen.height-200, border: '2px solid blue' }} 
            onClick={(e) => e.stopPropagation() }
            className={`relative
                w-11/12 max-w-2xl px-4 py-3 sm:px-8 sm:py-4
                bg-stone-800 text-white
                rounded-3xl shadow-2xl shadow-black
                ring ring-white/30
                max-h-screen overflow-y-scroll
                cursor-default
            `}>
            <div ref={topRef} className={`absolute top-0`}/>
            <div className={`text-center`}>
                <BsX className="fixed left-0 top-0 mt-2 ml-2 cursor-pointer text-gray-300 hover:text-white" onClick={() => setisContact(false)} size={30}/>
                <div className="rounded-full h-56 w-56 mx-auto bg-green-200 shadow-2xl shadow-black">
                    <img src="https://avatars0.githubusercontent.com/u/17098281?s=460&v=4" alt="avatar" className="rounded-full h-56 w-56 mx-auto bg-green-200"/>
                </div>
                <br/>
                <span className="font-bold text-2xl">Jakob Kirpal</span>
                <br/>
                <br/>
                <a href="mailto:jakobk@gmail.com" className="cursor-pointer hover:text-indigo-400 text-indigo-200">
                    jakobk@gmail.com
                </a>
                <br/>
                <span className="font-bold">Telegram: </span>
                <a href="https://t.me/jakobk" className="cursor-pointer hover:text-indigo-400 text-indigo-200">
                    @jakobk
                </a>
            </div>
        </div>
    </div>
  </>
}
