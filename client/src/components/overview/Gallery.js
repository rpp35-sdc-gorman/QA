// this is the image Gallery Component

import React from 'react'
import {useState} from 'react'
import keyId from '../common/keyId'
import {ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FullScreen} from 'akar-icons'

const Gallery = (props) => {

    // const [currentImage, setCurrentImage] = useState(0);
    // const [currentMiniImage, setCurrentMiniImage] = useState(0);

    // ALL OF THIS HAS BEEN MOVED TO COUPLER SO THAT THE GALLERIES DONT RESET ON RE-RENDERS

    // const handlePhotoChange = (operator, e) => {
    //   props.ClickTracker(e)
    //   if(operator === '+'){
    //     if(currentImage < props.images.length - 1){
    //       setCurrentImage(currentImage + 1);
    //     } else {
    //       // wrap to start
    //       setCurrentImage(0)
    //     }
    //   } else if(operator === '-'){
    //     if(currentImage > 0){
    //       setCurrentImage(currentImage - 1);
    //     } else {
    //       // wrap to end
    //       setCurrentImage(props.images.length - 1);
    //     }
    //   }
    // }

    // // advance mini gallery group
    // const handleMiniChange = (operator,e) => {
    //   props.ClickTracker(e)
    //   if(operator === '-' && currentMiniImage > 0){
    //     setCurrentMiniImage(currentMiniImage - 1)
    //   } else if ( operator === '+' && currentMiniImage < (props.images.length - 5) ){
    //     setCurrentMiniImage(currentMiniImage + 1)
    //   }
    // }

    // const jumpTo = (index, e) => {
    //   props.ClickTracker(e)
    //   setCurrentImage(index)
    // }

    const createMiniGallery = () => {
      if(props.images && props.images[0].thumbnail_url){
        const output = [];
        const cutoff = props.miniGalleryPosition + 4
        props.images.forEach((photo, index) => {
          if(index >= props.miniGalleryPosition && index <= cutoff){
            // const id = keyId()
            const e = <img
                      alt="mini gallery"
                      key={index}
                      onClick={(e) => {
                        props.ClickTracker(e)
                        props.jumpTo(index)
                      }}
                      className={props.galleryPosition === index ? 'Gallery_selected Gallery_mini' : 'Gallery_mini' }
                      src={photo.thumbnail_url}
                      loading='lazy'
                    />
            output.push(e)
          }
        })
        return output
      } else {
        // fallback element
        const item = <img
          alt = 'fallback'
          key={'12938'}
          className={'Gallery_selected Gallery_mini'}
          src={'https://www.texassampling.com/wp-content/uploads/2020/05/placeholder-product-image.jpg'}
          loading='lazy'
        />
        return [item]
      }
    }

    // gallery properties that change with state
    const GalleryStyles = () => {
      const fallbackImage = 'https://www.texassampling.com/wp-content/uploads/2020/05/placeholder-product-image.jpg';
      let imageUrl = fallbackImage;

      if (props.images[props.galleryPosition] && props.images[props.galleryPosition].url) {
        imageUrl = props.images[props.galleryPosition].url
      }

      const style = {backgroundImage: `url(${imageUrl})`}
      // if image is null or undfined load fallback image
      return ( style )
    }

    return(
      <article className={props.isFullscreen ? 'Gallery_fullscreen' : 'Gallery'} style={GalleryStyles()}>
        <div className='flexColumnCenter'>
        <ChevronUp
            size={16}
            className="GalleryArrow"
            onClick={(e) => {
              props.ClickTracker(e)
              props.handleMiniChange('-', props.images.length)
            }}
            />
          {
            createMiniGallery()
          }
          <ChevronDown
            size={16}
            className="GalleryArrow"
            onClick={(e) => {
              props.ClickTracker(e)
              props.handleMiniChange('+', props.images.length)
            }}
            />
        </div>
        <FullScreen
          id="fullscreen"
          className="GalleryArrow"
          strokeWidth='2'
          size={24}
          onClick={(e) => {
              props.ClickTracker(e)
              props.handleFullscreen()
          }}
        />
        <div className="flexRow GalleryMain">
          <button id="prevArrow" className="GalleryArrow" aria-label="prevArrow"
            onClick={(e) => {
              props.ClickTracker(e)
              props.handlePhotoChange('-', props.images.length)
            }}
          >
              <ChevronLeft strokeWidth='2' size={36} />
          </button>
          <button id="nextArrow" className="GalleryArrow" aria-label="nextArrow"
            onClick={(e) => {
              props.ClickTracker(e)
              props.handlePhotoChange('+', props.images.length)}
            }
            >
              <ChevronRight strokeWidth='2' size={36} />
          </button>
        </div>
      </article>
    )
}


export default Gallery;