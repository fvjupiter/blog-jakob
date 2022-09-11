import React, { useEffect } from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import Loader from '../../components/Loader';


const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}


export default function Stories({ stories, setstories, setinfo, information, kurzgeschichten }) {
  
  useEffect(() => {
    kurzgeschichten && setstories(kurzgeschichten)
    information && setinfo(information)
  }, [kurzgeschichten])

  if(stories && information)return (
    <div className='mb-40 px-4 md:px-8'>
        <div className='py-20 text-blue-900 dark:text-blue-100 text-center'>
          <h1 className='text-4xl sm:text-5xl font-semibold text-center'>Kurzgeschichten</h1>
          <div className='p-des'>{documentToReactComponents(information.descriptionStories, richText_Options)}</div>
        </div>
        <div className='flex flex-wrap justify-center'>
          {stories && stories.map((story, index) => (
            <Link key={index} href={`/kurzgeschichten/${story.fields.slug}`}>
              <div className={`
                w-96 h-32 md:m-6 lg:m-8 mt-0 mb-8 p-4 center
                text-center text-xl font-semibold 
                bg-gradient-to-b rounded-lg border ring-1
                from-white to-blue-50 
                dark:from-blue-200 dark:to-blue-300 
                border-blue-400 ring-blue-900 text-blue-900
                shadow-2xl dark:shadow-black/80 hover:shadow-none hover:ring-transparent duration cursor-pointer 
                `}>
                  <div>
                    {story.fields.title}
                    <div className='text-base font-normal'>{story.fields.dateText}</div>
                  </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
  return <div className='h-screen w-full center'><Loader /></div>
}

export async function getStaticProps() {

  const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'story' })
  const res2 = await client.getEntries({ content_type: 'info' })

  return {
      props: {
          kurzgeschichten: res.items,
          information: res2.items[0].fields,
      }
  }
}
