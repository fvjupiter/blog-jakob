import { createRef, useEffect, useRef, useState } from 'react'
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
        <div className='mb-40 lg:px-24'>
            <div className='py-20 text-lime-900 dark:text-lime-100 text-center'>
              <h1 className='text-4xl sm:text-5xl font-semibold text-center mb-4'>Reisebericht</h1>
              <div className='p-des'>{documentToReactComponents(information.descriptionArticle, richText_Options)}</div>
            </div>
            {articles.length && articles.map((item, index) => <div key={index} className={`relative`}>
                <Article props={item.fields}/>
            </div>)}
        </div>
    </>
    return <div className='h-screen w-full center'><Loader /></div>
}

const Article = ({ props }) => {
  const ref = useRef(null)

  const handleClick = () => {
    if(ref)ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  const [isOpen, setisOpen] = useState(false)
  const [showLocation, setshowLocation] = useState(false)
  const getDate = (date) => {
    const dateObj = new Date(date)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return dateObj.toLocaleDateString('de-DE', options)
  }
  return <>
    <div 
      onClick={() => {
        handleClick()
        setisOpen(!isOpen)
      }}
      className={`
        sticky top-12 sm:top-[56px] md:top-0 between z-10
        xl:h-16 h-[52px] w-full -translate-y-[1px]
        py-2 px-4 sm:px-10 xl:px-32 mx-auto
        bg-gradient-to-b rounded-b-g border-b shadow-xl dark:shadow-black/80
        md:rounded-lg
        from-lime-200 to-lime-300 border-lime-400 ring-lime-900 text-lime-900
        duration
      `}
      >
      <div className={`text-lg lg:text-xl font-semibold`}>
          {props.title}
      </div>
      <div className='center'>
        {<div className='hidden lg:block'>{getDate(props.date)}</div>}
        <GoLocation size={30} className={`${showLocation ? 'text-white' : 'rotate-0'} ml-4 duration cursor-pointer hover:text-white`}/>
        <BsChevronDown size={30} className={`${isOpen ? 'rotate-180' : 'rotate-0'} ml-4 duration cursor-pointer hover:text-white`}/>
      </div>
    </div>
    <div ref={ref} className='-translate-y-24 md:-translate-y-12 lg:-translate-y-16'/>
    <div className={`${isOpen ? 'h-fit' : 'h-40'} relative p-text leading-8 overflow-hidden text-justify dark:bg-gradient-to-br dark:from-stone-800 dark:to-stone-900 dark:text-lime-100 dark:shadow-2xl dark:shadow-black`}>
        {documentToReactComponents(props.content, richText_Options)}
        <div className={`${isOpen ? 'opacity-0' : 'opacity-100'} absolute inset-0 bg-gradient-to-t from-white via-white/70 dark:from-black dark:via-black/70 duration`}/>
    </div>
  </>
}

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
