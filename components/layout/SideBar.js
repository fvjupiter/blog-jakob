/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import Imprint from './Imprint'
import Contactcard from './Contactcard'
import ModeToggle from './ModeToggle'

//classNames
const cN = `font-semibold bg-gradient-to-b rounded-lg border ring-1 shadow-xl dark:shadow-black/80`
const colored = {
  lime: 'from-lime-200 to-lime-300 border-lime-400 ring-lime-900 text-lime-900',
  pink: 'from-pink-200 to-pink-300 border-pink-400 ring-pink-900 text-pink-900',
  stone: 'from-stone-200 to-stone-300 border-stone-400 ring-stone-900',
  yellow: 'from-yellow-200 to-yellow-300 border-yellow-400 ring-yellow-900 text-yellow-900',
  blue: 'from-blue-200 to-blue-300 border-blue-400 ring-blue-900 text-blue-900'
}

const navigation = [
  { name: 'Home', href: '/', cN: `${cN} ${colored.stone}`},
  { name: 'Reisebericht', href: '/reisebericht', cN: `${cN} ${colored.lime}`},
  { name: 'Gedichte', href: '/gedichte', cN: `${cN} ${colored.pink}`},
  { name: 'Kurzgeschichten', href: '/kurzgeschichten', cN: `${cN} ${colored.blue}`},
  { name: 'Bilder', href: '/bilder', cN: `${cN} ${colored.yellow}`},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideBar({ screen, info, isDark, toggleMode, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isImprint, setisImprint] = useState(false)
  const [isContact, setisContact] = useState(false)

  const router = useRouter()
  const asPath = router.asPath
  const isRoute = (href) => asPath.split('/')[1] == href.split('/')[1].replace('/', '')

  return (
    <>
      <Imprint screen={screen} isImprint={isImprint} setisImprint={setisImprint}/>
      <Contactcard screen={screen} isContact={isContact} setisContact={setisContact} info={info}/>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-stone-800 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className={`relative flex-1 flex flex-col max-w-xs w-full
                  ${isDark ? 'bg-gradient-to-r from-stone-800  to-stone-900' : 'bg-white'}
                `}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div 
                      onClick={toggleMode} 
                      className={`
                        absolute left-12 top-7
                        rounded-full p-1 
                        ring ring-transparent hover:ring-stone-500/50 dark:hover:ring-white/30 
                        cursor-pointer duration-75 active:shadow-inner
                    `}>
                      <ModeToggle isDark={isDark} />
                    </div>
                    {info && <div 
                      onClick={() => setisContact(true)} 
                      className="relative center h-12 w-12 rounded-full overflow-hidden mx-auto cursor-pointer"
                      >
                      <Image 
                        src={`https:${info.profilbild.fields.file.url}`}
                        alt={info.profilbild.fields.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>}
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                        >
                          <a
                            key={item.name + 'a'}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              isRoute(item.href)
                                ? item.cN
                                : `${isDark ? 'hover:bg-black/20 text-stone-300 hover:text-stone-200' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'} `,
                              'group center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex p-4">
                        <Footer isImprint={isImprint} setisImprint={setisImprint}/>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white dark:bg-gradient-to-r dark:from-stone-800  dark:to-stone-900">
          <div className="flex-1 flex flex-col min-h-0 border-r border-stone-200 dark:border-stone-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-scroll">
              <div className="relative center flex-shrink-0 px-4">
              <div 
                  onClick={toggleMode} 
                  className={`absolute left-10
                    rounded-full p-1 
                    ring ring-transparent hover:ring-stone-500/50 dark:hover:ring-white/30 
                    cursor-pointer duration-75 active:shadow-inner
                `}>
                  <ModeToggle isDark={isDark} />
                </div>
                {info && <div 
                    onClick={() => setisContact(true)} 
                    className="group relative center h-12 w-12 rounded-full overflow-hidden mx-auto cursor-pointer">
                    <Image 
                      src={`https:${info.profilbild.fields.file.url}`}
                      alt={info.profilbild.fields.title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className='group-hover:scale-[1.4] duration'
                    />
                  </div>}
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                  >
                    <a
                      key={item.name + 'a'}
                      className={classNames(
                        isRoute(item.href)
                        ? `${item.cN}` 
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:hover:bg-black/50 dark:text-stone-300 dark:hover:text-stone-200 border-transparent',
                        'group center px-2 py-2 text-sm font-medium rounded-md border'
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex p-4">
              <Footer isImprint={isImprint} setisImprint={setisImprint}/>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div onClick={() => setSidebarOpen(true)}
            className={`
              ${!isRoute('/reisebericht') && 'shadow-2xl shadow-black/30'}
              sticky -top-[1px] -translate-y-[1px] z-30 md:hidden 
              pl-1 pt-1 sm:pl-3 sm:pt-3 between backdrop
            `}>
            <button
              type="button"
              className={`
                -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md 
                text-stone-500 hover:text-stone-900 dark:text-stone-100 dark:hover:text-stone-300
              `}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className={`
              pr-4 pb-0.5
              font-medium text-lg
              ${isRoute('/reisebericht') ? 'text-lime-900 dark:text-lime-100'
              : isRoute('/gedichte') ? 'text-pink-900 dark:text-pink-100'
              : isRoute('/kurzgeschichten') ? 'text-blue-900 dark:text-blue-100'
              : isRoute('/bilder') ? 'text-yellow-900 dark:text-yellow-100'
              : 'text-stone-900 dark:text-stone-100'}
            `}>{
              isRoute('/reisebericht') ? 'Reisebericht'
              : isRoute('/gedichte') ? 'Gedichte'
              : isRoute('/kurzgeschichten') ? 'Kurzgeschichten'
              : isRoute('/bilder') ? 'Bilder'
              : 'Home'
            }</div>
          </div>
          <main className="flex-1 bg-gradient-to-r bg-white dark:from-stone-900 dark:via-stone-500 dark:to-stone-900">
            <div className="min-h-screen">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
