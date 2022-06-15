import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TopBar({ navItems }) {
    return (
        <div className='bg-stone-800 text-white z-10 fixed w-screen flex'>
            {navItems.map((item, index) => (
                <NavItem key={index} index={index} item={item}/>
            ))}
        </div>
    )
}

const NavItem = ({ index, item }) => {
    const router = useRouter()
    const asPath = router.asPath
    return (
        <Link href={item.href}>
            <div className={`group px-2 py-1.5 cursor-pointer`}>
                <div className={`
                        ${asPath == item.href && 'bg-white/20'} 
                        group-hover:bg-white/20 
                        px-4 py-2 rounded-lg duration-short
                    `}>
                    {item.title}
                </div>
            </div>
        </Link>
    )
}