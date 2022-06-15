import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { BsChevronDown } from "react-icons/bs";

export default function SideBar({ isActive, setisActive, navItems }) {
    const width = 'w-72'
    return <>
        <div className={`
            ${isActive ? width : 'w-0'} z-10 duration-long
            fixed top-0 pt-16 h-screen overflow-hidden
            bg-stone-700 text-white
        `}>
            <div className={`${width} h-screen overflow-scroll`}>
                {navItems.map((item, index) => (
                    <NavItem key={index} index={index} item={item}/>
                ))}
            </div>
        </div>
    </>
}

const NavItem = ({ index, item }) => {
    const router = useRouter()
    const asPath = router.asPath
    return <>
        <Link href={item.href}>
            <div className={`group px-2 py-1 cursor-pointer w-full`}>
                <div className={`
                        ${asPath == item.href && 'bg-white/20'} 
                        group-hover:bg-white/20 between
                        px-4 py-2 w-full rounded-lg duration-short
                    `}>
                    {item.title}
                    {/* <div><BsChevronDown size={17} /></div> */}
                </div>
            </div>
        </Link>
    </>
}
