// this is the image Gallery Component

import React from 'react'
import {useState} from 'react'
import keyId from '../common/keyId'
import {ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FullScreen} from 'akar-icons'

const Gallery = (props) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [currentMiniImage, setCurrentMiniImage] = useState(0);


    const handlePhotoChange = (operator, e) => {
      props.ClickTracker(e)
      if(operator === '+'){
        if(currentImage < props.images.length - 1){
          setCurrentImage(currentImage + 1);
        } else {
          // wrap to start
          setCurrentImage(0)
        }
      } else if(operator === '-'){
        if(currentImage > 0){
          setCurrentImage(currentImage - 1);
        } else {
          // wrap to end
          setCurrentImage(props.images.length - 1);
        }
      }
    }

    // advance mini gallery group
    const handleMiniChange = (operator,e) => {
      props.ClickTracker(e)
      if(operator === '-' && currentMiniImage > 0){
        setCurrentMiniImage(currentMiniImage - 1)
      } else if ( operator === '+' && currentMiniImage < (props.images.length - 5) ){
        setCurrentMiniImage(currentMiniImage + 1)
      }
    }

    const jumpTo = (index, e) => {
      props.ClickTracker(e)
      setCurrentImage(index)
    }

    const createMiniGallery = () => {
      if(props.images && props.images[0].thumbnail_url){
        const output = [];
        const cutoff = currentMiniImage + 4
        props.images.forEach((photo, index) => {
          if(index >= currentMiniImage && index <= cutoff){
            // const id = keyId()
            const e = <img
                      key={index}
                      onClick={(e) => jumpTo(index, e)}
                      className={currentImage === index ? 'Gallery_selected Gallery_mini' : 'Gallery_mini' }
                      src={photo.thumbnail_url}
                    />
            output.push(e)
          }
        })
        return output
      } else {
        // fallback element
        const item = <img
          key={'12938'}
          className={'Gallery_selected Gallery_mini'}
          src={'https://via.placeholder.com/150'}
        />
        return [item]
      }
    }

    // gallery properties that change with state
    const GalleryStyles = {
      // if image is null or undfined load fallback image
      'backgroundImage': `url(${props.images ? props.images[currentImage].url : 'https://via.placeholder.com/1200'})`
    }

    return(
      <article className={props.isFullscreen ? 'Gallery_fullscreen' : 'Gallery'} style={GalleryStyles}>
        <div className='flexColumnCenter'>
        <ChevronUp
            size={16}
            className="GalleryArrow"
            onClick={(e) => handleMiniChange('-', e)}
            />
          {
            createMiniGallery()
          }
          <ChevronDown
            size={16}
            className="GalleryArrow"
            onClick={(e) => handleMiniChange('+', e)}
            />
        </div>
        <FullScreen
          id="fullscreen"
          className="GalleryArrow"
          strokeWidth='2'
          size={24}
          onClick={(e) => props.handleFullscreen(e)}
        />
        <div className="flexRow GalleryMain">
          <button id="prevArrow" className="GalleryArrow"
            onClick={(e) => handlePhotoChange('-', e)}
          >
              <ChevronLeft strokeWidth='2' size={36} />
          </button>
          {/* <img className='Gallery_image' src={props.images ? props.images[currentImage].url : 'https://via.placeholder.com/350'} /> */}
          <button id="nextArrow" className="GalleryArrow"
            onClick={(e) => handlePhotoChange('+', e)}
            >
              <ChevronRight strokeWidth='2' size={36} />
          </button>
        </div>
      </article>
    )
}


export default Gallery;