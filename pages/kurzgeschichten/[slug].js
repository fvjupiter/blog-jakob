import React, { useEffect } from 'react'
import { createClient } from 'contentful'
import Loader from '../../components/Loader'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}

export default function Story({ slug, stories, setstories, kurzgeschichten, setinfo, information }) {

  useEffect(() => {
    kurzgeschichten && setstories(kurzgeschichten)
    information && setinfo(information)
  }, [kurzgeschichten])

  if(kurzgeschichten) return (
    <div className='mb-40 px-4 lg:px-24'>
        <div className='py-20 text-blue-900 text-center'>
          <h1 className='text-4xl sm:text-5xl font-semibold text-center mb-4'>{kurzgeschichten[0].fields.title}</h1>
          <div className='text-xl font-normal'>{kurzgeschichten[0].fields.dateText}</div>
        </div>
      <div className={`
          w-full sm:w-11/12 max-w-[1280px] m-6 mt-0 mb-12 p-4 mx-auto
          text-center text-xl
          bg-gradient-to-b rounded-lg border ring-1
          from-white to-blue-50 border-blue-400 ring-blue-900 text-blue-900
          shadow-2xl
          `}>
          <div>{documentToReactComponents(kurzgeschichten[0].fields.content, richText_Options)}</div>
        </div>
    </div>
  )
  return <div className='h-screen w-full center'><Loader /></div>
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
  
  export async function getStaticPaths(){
  
    const res = await client.getEntries({ content_type: 'story' })
  
    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })
  
    return {
        paths,
        fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
  
    const { items } = await client.getEntries({ 
        content_type: 'story',
        // 'fields.slug': params.slug,
    })
    const res2 = await client.getEntries({ content_type: 'info' })
  
    return {
        props: {
            kurzgeschichten: items,
            information: res2.items[0].fields,
            slug: params.slug
        }
    }
  }
  