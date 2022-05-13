// this is the image Gallery Component

import React from 'react'
import {useState} from 'react'

const Gallery = (props) => {

    const [currentImage, setCurrentImage] = useState(0);

    const handlePhotoChange = (operator) => {
      // wrap to beginngin
      if(currentImage === props.images.length - 1){
        setCurrentImage(0)
      } else if (currentImage === 0){
        setCurrentImage(props.images.length - 1)
      } else {
        switch(operator){
          case '-':
            setCurrentImage(currentImage - 1);
            break;
          default:
            setCurrentImage(currentImage + 1);
        }
      }
    }


    return(
      <article className='Gallery'>
        <div className='flexColumn'>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
        </div>
        <div className="flexRow GalleryMain">
          <button className="GalleryArrow"
            onClick={() => handlePhotoChange('+')}
          >
              arrow +
          </button>
          <img className='Gallery_image' src={props.images[currentImage].url}/>
          <button className="GalleryArrow"
            onClick={() => handlePhotoChange('-')}
            >
              arrow -
          </button>
        </div>
      </article>
    )
}


export default Gallery;