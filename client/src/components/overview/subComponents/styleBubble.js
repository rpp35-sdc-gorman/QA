// style selector bubble button

import React from 'react'

export default function Bubble (props) {

  const placeholder = 'https://via.placeholder.com/150';

  return(
      <button className="bubble" onClick={() => props.handleStyleChange(props.entity.style_id)}>
        <img className="bubble" src={props.image || placeholder} />
      </button>
  )
}