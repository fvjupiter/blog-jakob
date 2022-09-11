import { useEffect, useRef, useState } from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types';
import GridGallery from '../components/GridGallery';
import { ImageViewer } from '../components/ImageViewer';

const richText_Options = {
  renderNode: {
      [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
  },
}


export default function Bilder({ screen, bilder, imgLinks, setinfo, information }) {

  const [isFS, setisFS] = useState(false)
  const [imgId, setimgId] = useState(0)
  const setImgId = (id) => {
      setimgId(id)
      setisFS(true)
  }
  useEffect(() => information && setinfo(information), [information])

  return <>
    <div className='py-20 text-yellow-900 dark:text-yellow-100 text-center'>
      <h1 className='text-4xl sm:text-5xl font-semibold text-center mb-2'>Bilder</h1>
      {/* <div className='p-des'>{documentToReactComponents(information.descriptionArticle, richText_Options)}</div> */}
    </div>
    <GridGallery screen={screen} imgArr={imgLinks} setImgId={setImgId}/>
    <ImageViewer isFS={isFS} setisFS={setisFS} imgArr={imgLinks} imgId={imgId}/>
  </>
}

export async function getStaticProps() {

  const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'bilder' })
  const res2 = await client.getEntries({ content_type: 'info' })

  const imgLinks = []
  const imgs = res.items[0].fields.bilder
    for (let i = 0; i < imgs.length; i++) {
      imgLinks.push({
        src: imgs[i].fields.file.url,
        width: imgs[i].fields.file.details.image.width,
        height: imgs[i].fields.file.details.image.height,
      })
    }

  return {
      props: {
          bilder: res.items[0].fields,
          imgLinks: imgLinks,
          information: res2.items[0].fields,
      }
  }
}
