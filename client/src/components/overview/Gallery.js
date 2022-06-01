// this is the image Gallery Component

import React from 'react'
import {useState} from 'react'
import keyId from '../common/keyId'
import {ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FullScreen} from 'akar-icons'

const Gallery = (props) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [currentMiniImage, setCurrentMiniImage] = useState(0);


    const handlePhotoChange = (operator) => {
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
    const handleMiniChange = (operator) => {
      console.log(props.images.length)
      if(operator === '-' && currentMiniImage > 0){
        setCurrentMiniImage(currentMiniImage - 1)
      } else if ( operator === '+' && currentMiniImage < (props.images.length - 5) ){
        setCurrentMiniImage(currentMiniImage + 1)
      }
    }

    const jumpTo = (index) => {
      setCurrentImage(index)
    }

    const createMiniGallery = () => {
      if(props.images){
        const output = [];
        const cutoff = currentMiniImage + 4
        props.images.forEach((photo, index) => {
          if(index >= currentMiniImage && index <= cutoff){
            const id = keyId()
            const e = <img
                      key={id}
                      id={index}
                      onClick={() => jumpTo(index)}
                      className={currentImage === id ? 'Gallery_selected Gallery_mini' : 'Gallery_mini' }
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
        setMiniSet([item])
      }
    }

    // gallery properties that change with state
    const GalleryStyles = {
      'backgroundImage': `url(${props.images[currentImage].url})`
    }

    return(
      <article className={props.isFullscreen ? 'Gallery_fullscreen' : 'Gallery'} style={GalleryStyles}>
        <div className='flexColumnCenter'>
        <ChevronUp
            size={16}
            className="GalleryArrow"
            onClick={() => handleMiniChange('-')}
            />
          {
            createMiniGallery()
          }
          <ChevronDown
            size={16}
            className="GalleryArrow"
            onClick={() => handleMiniChange('+')}
            />
        </div>
        <FullScreen
          id="fullscreen"
          className="GalleryArrow"
          strokeWidth='2'
          size={24}
          onClick={() => props.handleFullscreen()}
        />
        <div className="flexRow GalleryMain">
          <button id="prevArrow" className="GalleryArrow"
            onClick={() => handlePhotoChange('-')}
          >
              <ChevronLeft strokeWidth='2' size={36} />
          </button>
          {/* <img className='Gallery_image' src={props.images ? props.images[currentImage].url : 'https://via.placeholder.com/350'} /> */}
          <button id="nextArrow" className="GalleryArrow"
            onClick={() => handlePhotoChange('+')}
            >
              <ChevronRight strokeWidth='2' size={36} />
          </button>
        </div>
      </article>
    )
}


export default Gallery;