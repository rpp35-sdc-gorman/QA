// This is a Container - it contains.... things
// it mostly acts as a gate keeper to make sure something is always being rendered

import React from 'react'

import StyleSelector from './StyleSelector';
import Stars from '../common/stars.jsx';

// recieving list of styles and selected style from props
const Container = (props) => {
  // query the api for the specific styles and pass that to style selector
  // this will be in charge of overlaying a loading screen when there is no data
    return(
      <article>
        { props.currentStyle ?
          <section className='flexColumn'>
            <StyleSelector
              currentStyle={props.currentStyle}
              info={props.info}
              styles={props.styles}
              rating={props.rating}
              handleStyleChange={props.handleStyleChange}
              ClickTracker={props.ClickTracker}
            />
          </section>
          :
          null
        }
      </article>
    )
}

export default Container