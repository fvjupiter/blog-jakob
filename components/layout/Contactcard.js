import Image from "next/image";
import { useEffect, useRef } from "react";
import { BsX } from "react-icons/bs";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import Loader from "../Loader";

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}

export default function Contactcard({ screen, isContact, setisContact, info }) {
    const topRef = useRef(null)
    useEffect(() => {
        if (topRef && topRef.current) {
            topRef.current.scrollIntoView()
        }
    }, [isContact])

  if(info) return <>
    <div onClick={() => setisContact(false)} 
        className={`${isContact ? 'visible' : 'hidden'} fixed inset-0 backdrop bg-black/60 center z-[1000] cursor-alias`}
        >
        <div style={{ maxHeight: screen.height-200, border: '2px solid blue' }} 
            onClick={(e) => e.stopPropagation() }
            className={`relative
                w-11/12 max-w-2xl px-4 py-8 sm:px-8
                bg-stone-800 text-white
                rounded-3xl shadow-2xl shadow-black
                ring ring-white/30
                max-h-screen overflow-y-scroll
                cursor-default
            `}>
            <div ref={topRef} className={`absolute top-0`}/>
            <div className={`text-center`}>
                <BsX className="fixed left-0 top-0 mt-2 ml-2 cursor-pointer text-gray-300 hover:text-white" onClick={() => setisContact(false)} size={30}/>
                <div className="relative overflow-hidden rounded-full h-56 w-56 mx-auto bg-green-200 shadow-2xl shadow-black">
                    <Image 
                        src={`https:${info.profilbild.fields.file.url}`}
                        alt={info.profilbild.fields.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <br/>
                <div className="font-bold text-2xl mt-2">Jakob Kirpal</div>
                <br/>
                <div className='w-full between mx-auto max-w-[220px]'>
                    <span className="font-bold">Email: </span>
                    <a href="mailto:jakobk@gmail.com" className="cursor-pointer hover:text-indigo-400 text-indigo-200">
                        jakobk@gmail.com
                    </a>
                </div>
                <div className='w-full between mx-auto max-w-[220px]'>
                    <span className="font-bold">Telegram: </span>
                    <a href="https://t.me/jakobk" className="cursor-pointer hover:text-indigo-400 text-indigo-200">
                        @jakobkirpalyo
                    </a>
                </div>
                <br/>
                <div>{documentToReactComponents(info.about, richText_Options)}</div>
            </div>
        </div>
    </div>
  </>
  return <div className='h-screen w-full center'><Loader /></div>
}
