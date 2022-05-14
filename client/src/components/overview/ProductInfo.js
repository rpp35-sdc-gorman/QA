// This is the Product Info Component

import React from 'react'

import StyleSelector from './StyleSelector';
import Stars from '../common/5star.jsx';

// test Data -  remove later
import {testProductStyles} from '../../../../config'

// recieving list of styles and selected style from props

class ProductInfo extends React.Component{
  constructor(props){
    super()
    this.state= {
      forceUpdate: 0
    }
  }

  // query the api for the specific styles and pass that to style selector
  render(){
    return(
      <article className='ProductInfo'>
        { this.props.currentStyle ?
          <section>
            <article className="info">
              <div className='flexRow'>
                <Stars />
                <sub><a>Read All Reviews</a></sub>
              </div>
              <div>
                <h4>Category</h4>
                <h2>{this.props.currentStyle.name}</h2>
                <h4>${this.props.currentStyle.sale_price || this.props.currentStyle.original_price }</h4>
              </div>
            </article>
            <StyleSelector
              currentStyle={this.props.currentStyle}
              styles={this.props.styles}
              handleStyleChange={this.props.handleStyleChange}
            />
          </section>
          :
          null
        }
      </article>
    )
  }
}

export default ProductInfo;