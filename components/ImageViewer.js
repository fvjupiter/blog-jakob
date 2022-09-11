import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";
import Image from "next/image";


const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const ImageViewer = ({ isFS, setisFS, imgArr, imgId }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  useEffect(() => setPage([imgId, 0]), [imgId, isFS])

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, imgArr.length, page);

  const paginate = (newDirection) => {
    // setImgId(imgId )
    // console.log([page + newDirection, newDirection])
    setPage([page + newDirection, newDirection]);
  }
  
  return (
    <>{isFS &&
      <div className="fixed inset-0 center z-50 bg-black/80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className='absolute w-full h-full'
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            // onDragEnd={(e, { offset, velocity }) => {
            //   const swipe = swipePower(offset.x, velocity.x);

            //   if (swipe < -swipeConfidenceThreshold) {
            //     paginate(1);
            //   } else if (swipe > swipeConfidenceThreshold) {
            //     paginate(-1);
            //   }
            // }}
          ><div className="absolute h-full w-full z-20"/>
              <Image
                src={`https:${imgArr[imageIndex].src}`}
                // blurDataURL={Home}
                // placeholder='blur'
                layout='fill'
                objectFit="contain"
                objectPosition='center'
              />
          </motion.div>
        </AnimatePresence>
        <div onClick={() => setisFS(false)} className={`absolute text-gray-300 hover:text-white duration-200 left-2 top-2 z-30 cursor-pointer center`}>
          <BsX size={60}/>
        </div>
        <div className={`${classNextPrev} right-0 pr-2 justify-end cursor-e-resize`} onClick={() => paginate(1)}>
          <BsChevronRight size={50}/>
        </div>
        <div className={`${classNextPrev} left-0 pl-2 justify-start cursor-w-resize`} onClick={() => paginate(-1)}>
          <BsChevronLeft size={50}/>
        </div>
      </div>
    }</>
  );
};

const classNextPrev = 'absolute text-gray-300 hover:text-white duration-200 w-1/2 h-full flex items-center z-20'
