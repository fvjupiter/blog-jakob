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

export default function Gedicht({ slug, poems, setpoems, gedichte, setinfo, information }) {
  
  useEffect(() => {
    gedichte && setpoems(gedichte)
    information && setinfo(information)
  }, [gedichte, information])

  return (
    <div className='mb-40 px-4 lg:px-24'>
        <div className='py-20 text-pink-900 text-center'>
          <h1 className='text-4xl sm:text-5xl font-semibold text-center mb-4'>{gedichte[0].fields.title}</h1>
          <div className='text-xl font-normal'>{gedichte[0].fields.datum}</div>
          {/* <div>{documentToReactComponents(info.descriptionpoems, richText_Options)}</div> */}
        </div>
      {gedichte &&
        <div className={`
          w-full sm:w-11/12 max-w-[750px] m-6 mt-0 mb-12 p-4 mx-auto
          text-center text-xl
          bg-gradient-to-b rounded-lg border ring-1
          from-white to-pink-50 border-pink-400 ring-pink-900 text-pink-900
          shadow-2xl
          `}>
          {/* <div className='text-base font-normal'>{gedichte[0].fields.datum}</div> */}
          <div>{documentToReactComponents(gedichte[0].fields.content, richText_Options)}</div>
        </div>
      }
    </div>
  )
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
  
  export async function getStaticPaths(){
  
    const res = await client.getEntries({ content_type: 'gedicht' })
  
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
        content_type: 'gedicht',
        // 'fields.slug': params.slug,
    })
    const res2 = await client.getEntries({ content_type: 'info' })

    return {
        props: {
            gedichte: items,
            information: res2.items[0].fields,
            slug: params.slug
        }
    }
  }
  