import React from 'react'

export default function Footer({ setisImprint }) {
  return (
    <div className='relative bottom-0 z-10 w-full border-t border-t-gray-400 dark:border-stone-700 text-white flex items-start pt-2 justify-center'>
        <div className='text-sm text-gray-400 dark:text-stone-400 text-center'>
            <div>© 2022 All Rights Reserved.</div>
            <div>Powered by <a className='cursor-pointer synesthesigns font-bold' href="https://synesthesigns.com/" rel="noreferrer" target='_blank'>Synesthesigns</a>.</div>
            <div onClick={() => setisImprint(true)} className={`hover:text-gray-300 dark:hover:text-stone-300 cursor-pointer`}>Imprint</div>
        </div>
    </div>
  )
}
