import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'
import Loader from '../../components/Loader'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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

  const [story, setstory] = useState(null)
  useEffect(() => {
    const story = stories.find(story => story.fields.slug === slug)
    setstory(story)
  }, [slug, stories])

  const cNButtons = `text-3xl lg:text-5xl text-blue-900 hover:text-blue-600 duration`
  // create a function which uses next/link to navigate to the previous story
  const PrevStory = () => {
    const index = stories.findIndex(story => story.fields.slug === slug)
    const prevStory = stories[index - 1]
    if (prevStory) {
      return <Link href={`/kurzgeschichten/${prevStory.fields.slug}`}><a className={`${cNButtons} left-0`}><BsChevronLeft/></a></Link>
    } else {
      return <Link href={`/kurzgeschichten/${stories[stories.length - 1].fields.slug}`}><a className={`${cNButtons} left-0`}><BsChevronLeft/></a></Link>
    }
  }

  // create a function which uses next/link to navigate to the next story
  const NextStory = () => {
    const index = stories.findIndex(story => story.fields.slug === slug)
    const nextStory = stories[index + 1]
    if (nextStory) {
      return <Link href={`/kurzgeschichten/${nextStory.fields.slug}`}><a className={`${cNButtons} right-0`}><BsChevronRight/></a></Link>
    } else {
      return <Link href={`/kurzgeschichten/${stories[0].fields.slug}`}><a className={`${cNButtons} right-0`}><BsChevronRight/></a></Link>
    }
  }

  if(story) return (
    <div className='mb-40 px-4 lg:px-24'>
        <div className='py-20 text-blue-900 text-center'>
          <div className='between mb-4'>
            <PrevStory />
            <h1 className='text-2xl lg:text-5xl font-semibold text-center'>{story.fields.title}</h1>
            <NextStory />
          </div>
          <div className='text-xl font-normal'>{story.fields.dateText}</div>
        </div>
      <div className={`
          w-full sm:w-11/12 max-w-[1280px] m-6 mt-0 mb-12 p-4 mx-auto
          p-text leading-8 overflow-hidden text-justify
          bg-gradient-to-b rounded-lg border ring-1
          from-white to-blue-50 border-blue-400 ring-blue-900 text-blue-900
          shadow-2xl
          `}>
          <div>{documentToReactComponents(story.fields.content, richText_Options)}</div>
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
  