// this is the image Gallery Component

import React from 'react'
import {useState} from 'react'

import {ChevronLeft, ChevronRight, ChevronDown} from 'akar-icons'

const Gallery = (props) => {

    const [currentImage, setCurrentImage] = useState(0);

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

    const jumpTo = (index) => {
      setCurrentImage(index)
    }

    const createMiniGallery = () => {
      if(props.images){
        return props.images.map((photo, index) => {
          return <img
                    key={index}
                    onClick={() => jumpTo(index)}
                    className={currentImage === index ? 'Gallery_selected Gallery_mini' : 'Gallery_mini' }
                    src={photo.thumbnail_url}
                  />
        });
      } else {
        return <img
          key={'12938'}
          className={'Gallery_selected Gallery_mini'}
          src={'https://via.placeholder.com/150'}
        />
      }
    }

    return(
      <article className='Gallery'>
        <div className='flexColumnCenter'>
          {
            createMiniGallery()
          }
          <ChevronDown size={16} className="GalleryArrow" />
        </div>
        <div className="flexRow GalleryMain">
          <button id="prevArrow" className="GalleryArrow"
            onClick={() => handlePhotoChange('-')}
          >
              <ChevronLeft strokeWidth='2' size={36} />
          </button>
          <img className='Gallery_image' src={props.images ? props.images[currentImage].url : 'https://via.placeholder.com/350'} />
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