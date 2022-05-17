// style selector bubble button

import React from 'react'

export default function Bubble (props) {


  return(
    <button className="bubble" onClick={() => props.handleStyleChange(props.entity.style_id)}>
      <img className="bubble" src={props.image} />
    </button>
  )
}