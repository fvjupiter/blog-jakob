import React, { useEffect } from 'react'
import Link from 'next/link'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Loader from '../components/Loader'

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}

export default function Home({ screen, setinfo, information }) {

  useEffect(() => information && setinfo(information), [information])

   //classNames
   const cN = `m-6 p-4 text-2xl font-semibold bg-gradient-to-b rounded-lg border ring-1 shadow-2xl shadow-black/30 hover:shadow-none hover:ring-transparent duration md:w-1/2 center cursor-pointer`
   const colored = {
     lime: 'from-lime-200 to-lime-300 border-lime-400 ring-lime-900 text-lime-900',
     pink: 'from-pink-200 to-pink-300 border-pink-400 ring-pink-900 text-pink-900',
     stone: 'from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 dark:text-white dark:border-stone-700 dark:ring-white/10 border-stone-400 ring-stone-900',
     yellow: 'from-yellow-200 to-yellow-300 border-yellow-400 ring-yellow-900 text-yellow-900',
     blue: 'from-blue-200 to-blue-300 border-blue-400 ring-blue-900 text-blue-900'
   }

  if(information) return <>
    <div className='h-screen w-full mb-20'>
      <div className={`w-full md:h-[50vh] md:p-4 md:pb-0 md:flex`}>
        <Link href='reisebericht'>
          <div className={`${cN} ${colored.lime}`}>
            <div>
              <div className='text-center mb-2'>Reisebericht</div>
              <div className='text-base font-normal'>{documentToReactComponents(information.fields.shortDesArticle, richText_Options)}</div>
            </div>
          </div>
        </Link>
        <Link href='gedichte'>
          <div className={`${cN} ${colored.pink}`}>
            <div>
              <div className='text-center mb-2'>Gedichte</div>
              <div className='text-base font-normal'>{documentToReactComponents(information.fields.shortDesGedichte, richText_Options)}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className={`w-full md:h-[50vh] md:p-4 md:pt-0 md:flex`}>
        <Link href='kurzgeschichten'>
          <div className={`${cN} ${colored.blue}`}>
            <div>
              <div className='text-center mb-2'>Kurzgeschichten</div>
              <div className='text-base font-normal'>{documentToReactComponents(information.fields.shortDesStories, richText_Options)}</div>
            </div>
          </div>
        </Link>
        <Link href='bilder'>
          <div className={`${cN} ${colored.yellow}`}>
            <div>
              <div className='text-center mb-2'>Bilder</div>
              <div className='text-base font-normal'>{documentToReactComponents(information.fields.shortDesBilder, richText_Options)}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </>
  return <div className='h-screen w-full center'><Loader /></div>
}

export async function getStaticProps() {

  const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'info' })

  return {
      props: {
          information: res.items[0],
      }
  }
}
