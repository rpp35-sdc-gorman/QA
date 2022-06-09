// This is a Container - it contains.... things
// it mostly acts as a gate keeper to make sure something is always being rendered

import React from 'react'

import StyleSelector from './StyleSelector';
import Stars from '../common/stars.jsx';

// recieving list of styles and selected style from props
const Container = (props) => {
  // query the api for the specific styles and pass that to style selector
  // this will be in charge of overlaying a loading screen when there is no data
  const stateChecker = () => {
    // stuff is loading
    if(props.isLoading && !props.didError){
      return(
        <article className="loading">
          <h1>Loading...</h1>
        </article>
      )
    } else if (!props.isLoading && !props.didError) {
      // loading completed success
      return(
        <article id="overview_container">
          { props.currentStyle ?
            <section className='flexColumn'>
              <StyleSelector
                currentStyle={props.currentStyle}
                info={props.info}
                styles={props.styles}
                rating={props.rating}
                handleStyleChange={props.handleStyleChange}
                ClickTracker={props.ClickTracker}
                addOutfit={props.addOutfit}
                isAdded={props.isAdded}
              />
            </section>
            :
            <article>
              <h1>Something went wrong 🥲</h1>
            </article>
          }
        </article>
      )
    } else if (props.didError) {
      // loading is done but there is an error
      <article>
        <h1> 🪐 Looks like thats lost in space 🔭 </h1>
      </article>
    }
  }

  return(
    stateChecker()
  )

}

export default Container