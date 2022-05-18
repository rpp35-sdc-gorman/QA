// This is a Container - it contains.... things

import React from 'react'

import StyleSelector from './StyleSelector';
import Stars from '../common/stars.jsx';

// recieving list of styles and selected style from props
const Container = (props) => {


  // query the api for the specific styles and pass that to style selector
    return(
      <article>
        { props.currentStyle ?
          <section className='flexColumn'>
            <StyleSelector
              currentStyle={props.currentStyle}
              info={props.info}
              styles={props.styles}
              handleStyleChange={props.handleStyleChange}
            />
          </section>
          :
          null
        }
      </article>
    )
}

export default Container