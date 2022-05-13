// this is the image Gallery Component

import React from 'react'

class Gallery extends React.Component{
  constructor(props){
    super()
    this.state = {

    }
  }


  render(){
    return(
      <article className='Gallery'>
        <div className='flexColumn'>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
        </div>
        <img className='Gallery_image' src={this.props.image}/>
      </article>
    )
  }
}


export default Gallery;