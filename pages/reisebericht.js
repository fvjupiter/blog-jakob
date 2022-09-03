import { useEffect, useRef, useState } from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Loader from '../components/Loader';

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}

export default function Reisebericht({ isDark, articles, setinfo, information }) {
    useEffect(() => information && setinfo(information), [information])
    if(information && articles) return <>
        <div className='mb-40 md:px-24'>
            <div className='py-20 text-lime-900 text-center'>
              <h1 className='text-4xl sm:text-5xl font-semibold text-center mb-4'>Reisebericht</h1>
              <div>{documentToReactComponents(information.descriptionArticle, richText_Options)}</div>
            </div>
            {articles.length && articles.map((item, index) => (
              <div key={index} className={`relative`}>
                  <Article 
                    props={item.fields}
                    click={() => setisOpen(index === isOpen ? -1 : index)}
                  />
              </div>
            ))}
        </div>
    </>
    return <div className='h-screen w-full center'><Loader /></div>
}

const Article = ({ props, click }) => {
  const [isOpen, setisOpen] = useState(false)
  const [showLocation, setshowLocation] = useState(false)
  const getDate = (date) => {
    const dateObj = new Date(date)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return dateObj.toLocaleDateString('de-DE', options)
  }
  return <>
    <div 
      onClick={() => setisOpen(!isOpen)}
      className={`
        sticky top-12 md:top-0 between z-10
        md:h-20 h-[52px] w-full -translate-y-[1px]
        py-2 px-4 sm:px-10 md:px-32 mx-auto
        bg-gradient-to-b rounded-b-g border-b shadow-xl
        md:rounded-lg
        from-lime-200 to-lime-300 border-lime-400 ring-lime-900 text-lime-900
        duration
      `}
      >
      <div className={`text-lg md:text-xl font-semibold`}>
          {props.title}
      </div>
      <div className='center'>
        {<div className='hidden md:block'>{getDate(props.date)}</div>}
        <GoLocation size={30} className={`${showLocation ? 'text-white' : 'rotate-0'} ml-4 duration cursor-pointer hover:text-white`}/>
        <BsChevronDown size={30} className={`${isOpen ? 'rotate-180' : 'rotate-0'} ml-4 duration cursor-pointer hover:text-white`}/>
      </div>
    </div>
    <div className={`${isOpen ? 'h-fit' : 'h-40'} relative p-text leading-8 overflow-hidden text-justify`}>
        {documentToReactComponents(props.content, richText_Options)}
        <div className={`${isOpen ? 'opacity-0' : 'opacity-100'} absolute inset-0 bg-gradient-to-t from-white via-white/70 duration`}/>
    </div>
  </>
}

// md:-top-[1px] top-[58px]

export async function getStaticProps() {

  const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'article' })
  const res2 = await client.getEntries({ content_type: 'info' })

  return {
      props: {
          articles: res.items,
          information: res2.items[0].fields,
      }
  }
}
