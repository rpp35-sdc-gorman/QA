import React from 'react';

var AnswerImages = (props) => {
  return (
    <div id="answerImages">
      {props.photos.length > 0 ? props.photos.map((photo, index) => {
        return (
          <div key={photo.id}>
            <img
              src={photo.url.includes('imagekit') ? `${photo.url}?tr=w-0.5`:photo.url}
              onClick={(event) => props.toggleImage(event)}
              loading='lazy'
            />
          </div>
        )
      }) : <></>}
    </div>
  )
}

export default AnswerImages;