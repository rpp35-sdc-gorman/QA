// style selector bubble button

import React from 'react'

export default function Bubble (props) {

  const placeholder = 'https://via.placeholder.com/150';

  return(
      <button className="bubble" onClick={(e) => props.handleStyleChange(props.entity.style_id, e)}>
        <img src={props.image || placeholder} />
      </button>
  )
}