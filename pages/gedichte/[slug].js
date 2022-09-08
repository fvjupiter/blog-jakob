import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Loader from '../../components/Loader';

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}

export default function Gedicht({ screen, slug, poems, setpoems, gedichte, setinfo, information }) {
  
  useEffect(() => {
    gedichte && setpoems(gedichte)
    information && setinfo(information)
  }, [gedichte, information])

  const [isLoading, setisLoading] = useState(false)
  const [poem, setpoem] = useState(null)
  useEffect(() => {
    const poem = poems.find(poem => poem.fields.slug === slug)
    setpoem(poem)
    setisLoading(false)
  }, [slug, poems])

  const cNButtons = `text-3xl lg:text-5xl text-pink-900 hover:text-pink-600 duration`
  // create a function which uses next/link to navigate to the previous poem
  const PrevPoem = () => {
    const index = poems.findIndex(poem => poem.fields.slug === slug)
    const prevPoem = poems[index - 1]
    if (prevPoem) {
      return <Link href={`/gedichte/${prevPoem.fields.slug}`}><a onClick={() => setisLoading(true)} className={`${cNButtons} left-0`}><BsChevronLeft/></a></Link>
    } else {
      return <Link href={`/gedichte/${poems[poems.length - 1].fields.slug}`}><a onClick={() => setisLoading(true)} className={`${cNButtons} left-0`}><BsChevronLeft/></a></Link>
    }
  }

  // create a function which uses next/link to navigate to the next poem
  const NextPoem = () => {
    const index = poems.findIndex(poem => poem.fields.slug === slug)
    const nextPoem = poems[index + 1]
    if (nextPoem) {
      return <Link href={`/gedichte/${nextPoem.fields.slug}`}><a onClick={() => setisLoading(true)} className={`${cNButtons} right-0`}><BsChevronRight/></a></Link>
    } else {
      return <Link href={`/gedichte/${poems[0].fields.slug}`}><a onClick={() => setisLoading(true)} className={`${cNButtons} right-0`}><BsChevronRight/></a></Link>
    }
  }

  if(poem) return (
    <div className='mb-40 px-4 lg:px-24'>
        <div className='relative py-20 text-pink-900 text-center'>
          <div className='between mb-4'>
            <PrevPoem />
            {!isLoading
            ? <h1 className='text-2xl lg:text-5xl font-semibold text-center'>{poem.fields.title}</h1>
            : <Loader />}
            <NextPoem />
          </div>
          <div className='text-xl font-normal'>{poem.fields.datum}</div>
          
          {/* <div>{documentToReactComponents(info.descriptionpoems, richText_Options)}</div> */}
        </div>
      {gedichte &&
        <div className={`
          w-full sm:w-11/12 max-w-[750px] m-6 mt-0 mb-12 p-4 mx-auto
          text-center text-sm sm:text-base md:text-sm lg:text-xl
          bg-gradient-to-b rounded-lg border ring-1
          from-white to-pink-50 border-pink-400 ring-pink-900 text-pink-900
          shadow-2xl
          `}>
          {/* <div className='text-base font-normal'>{gedichte[0].fields.datum}</div> */}
          <div>{documentToReactComponents(poem.fields.content, richText_Options)}</div>
        </div>
      }
    </div>
  )
  return <div className='h-screen w-full center'><Loader /></div>
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
  