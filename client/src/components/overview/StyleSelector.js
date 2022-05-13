// This is the styleSelector Component

import React from 'react';

import Gallery from './Gallery';
import Bubble from './subComponents/styleBubble';

// sample data - remove this later
// import {testProductStyles} from '../../../../config';


class StyleSelector extends React.Component{
  constructor(props){
    super()
    this.state = {
      // currentStyle: null
      bubbles: ''
    }
  }

  componentDidMount(){
    this.setState({bubbles: this.createBubbles()})
  }

  createBubbles () {
    console.log(this.props)
    return this.props.styles.map((item, index) => {
      return <Bubble
                key={index}
                entity={item}
                image={item.photos[0].thumbnail_url}
                handleStyleChange={this.props.handleStyleChange}
            />
    })
  }


  render(){
    return(
      <article className="flexRow">
        <Gallery
          images={this.props.currentStyle.photos}
        />
        <section>
          <h4>Style > {this.props.currentStyle.name}</h4>
          <div className="gridRows">
            {this.state.bubbles}
          </div>
        </section>
      </article>
    )
  }
}


export default StyleSelector;