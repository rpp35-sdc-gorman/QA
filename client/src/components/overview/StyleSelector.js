// This is the styleSelector Component

import React from 'react';

import Gallery from './Gallery';
import Bubble from './subComponents/styleBubble';
import Stars from '../common/stars.jsx';
import OrderForm from './OrderForm';

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
          <article className="info">
            <div className='flexRow'>
              <Stars />
              <sub><a>Read All Reviews</a></sub>
            </div>
            <div>
              <h4>{this.props.info.category}</h4>
              <h2>{this.props.currentStyle.name}</h2>
              <h4>${this.props.currentStyle.sale_price || this.props.currentStyle.original_price }</h4>
            </div>
          </article>
          <h4>Style > {this.props.currentStyle.name}</h4>
          <div className="gridRows">
            {this.state.bubbles}
          </div>
          <OrderForm />
        </section>
      </article>
    )
  }
}


export default StyleSelector;