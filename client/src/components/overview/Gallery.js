// this is the image Gallery Component

import React from 'react'

import style from './styles/gallery.module.css'

class Gallery extends React.Component{
  constructor(props){
    super()
    this.state = {

    }
  }


  render(){
    return(
      <article className={style.Gallery}>
        <div className={style.flexColumn}>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
          <span>[list of imgs]</span>
        </div>
        <img className={style.Gallery_image} src={this.props.image}/>
      </article>
    )
  }
}


export default Gallery;