import React from 'react';

var AnswerImages = (props) => {
  let photo = 'https://via.placeholder.com/75'
  return (
    <div id="answerImages">
      {/* {props.photos.map((photo, index) => {
        return
        <img
          key={index}
          src={photo.url}
        />
      })} */}
      <img onClick={(photo) => props.toggleImage(photo)} src={'https://via.placeholder.com/75'} />
      <img onClick={(photo) => props.toggleImage(photo)} src={'https://via.placeholder.com/75'} />
    </div>
  )
}

export default AnswerImages;