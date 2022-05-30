// This is the styleSelector Component

import React from 'react';

import Gallery from './Gallery';
import Bubble from './subComponents/styleBubble';
import Stars from '../common/stars.jsx';
import OrderForm from './OrderForm';
import keyId from '../common/keyId';
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
    return this.props.styles.map((item) => {
      const id = keyId();
      return <Bubble
                key={keyId()}
                entity={item}
                image={item.photos[0].thumbnail_url}
                handleStyleChange={this.props.handleStyleChange}
            />
    })
  }

  formatPrice (original, sale) {
    if (sale) {
      return (
        <span className="price">
          <span className="price-sale">
            ${sale}
          </span>
          <span className="price-cross">
            ${original}
          </span>
        </span>
      )
    } else {
      return (
        <span className="price-original">
          ${original}
        </span>
      )
    }
  }

  render(){
    return(
      <article className="flexRow">
        <Gallery
          images={this.props.currentStyle.photos}
        />
        <section className="Style_Selector">
          <article className="info">
            <div className='flexRow'>
              <Stars  />
              <sub><a>Read All Reviews</a></sub>
            </div>
            <div>
              <h4>{this.props.info.category}</h4>
              <h2>{this.props.currentStyle.name}</h2>
              <h4>{this.formatPrice(this.props.currentStyle.original_price, this.props.currentStyle.sale_price)}</h4>
            </div>
          </article>
          <h4>Style > {this.props.currentStyle.name}</h4>
          <div className="gridRows">
            {this.state.bubbles}
          </div>
          <OrderForm inventory={this.props.currentStyle.skus} />
        </section>
      </article>
    )
  }
}


export default StyleSelector;