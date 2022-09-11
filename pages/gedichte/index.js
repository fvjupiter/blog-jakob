import React, { useEffect } from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';


const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}


export default function Gedichte({ poems, setpoems, gedichte, setinfo, information }) {
  
  useEffect(() => {
    gedichte && setpoems(gedichte)
    information && setinfo(information)
  }, [gedichte, information])

  return (
    <div className='mb-40 px-4 lg:px-24'>
        <div className='py-20 text-pink-900 dark:text-pink-100 text-center'>
          <h1 className='text-4xl sm:text-5xl font-semibold text-center'>Gedichte</h1>
          {/* <div>{documentToReactComponents(info.descriptionGedichte, richText_Options)}</div> */}
        </div>
        <div className='flex flex-wrap justify-center md:-mt-6'>
          {poems && poems.map((poem, index) => (
            <Link key={index} href={`/gedichte/${poem.fields.slug}`}>
              <div className={`
                w-96 md:m-6 lg:m-8 mt-0 mb-8 p-4 lg:py-8
                text-center text-xl font-semibold 
                bg-gradient-to-b rounded-lg border ring-1
                from-white to-pink-50
                dark:from-pink-200 dark:to-pink-300 
                border-pink-400 ring-pink-900 text-pink-900
                shadow-2xl dark:shadow-black/80 hover:shadow-none hover:ring-transparent duration cursor-pointer 
                `}>
                {poem.fields.title}
                <div className='text-base font-normal'>{poem.fields.datum}</div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export async function getStaticProps() {

  const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'gedicht' })
  const res2 = await client.getEntries({ content_type: 'info' })

  return {
      props: {
          gedichte: res.items,
          information: res2.items[0].fields,
      }
  }
}
