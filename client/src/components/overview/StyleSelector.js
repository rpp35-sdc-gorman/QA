// This is the styleSelector Component

import React from 'react';

import Gallery from './Gallery';
import Bubble from './subComponents/styleBubble';
import Stars from '../common/stars.jsx';
import OrderForm from './OrderForm';
import keyId from '../common/keyId';
// sample data - remove this later
// import {testProductStyles} from '../../../../config';

import { getAverageRating } from '../common/averageRating';
import axios from 'axios'

class StyleSelector extends React.Component{
  constructor(props){
    super()
    this.state = {
      // currentStyle: null
      bubbles: '',
      isFullscreen: false,
      rating: null
    }
    this.handleFullscreen = this.handleFullscreen.bind(this)
  }

  componentDidMount(){
    this.setState({bubbles: this.createBubbles()})
    this.getRating();
  }

  createBubbles () {
    if (this.props.styles) {
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
  }

  handleFullscreen(e){
    this.props.ClickTracker(e);
    this.setState({'isFullscreen': !this.state.isFullscreen})
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

  getRating () {
    axios.get(`/rating_review/${this.props.info.id}/rating`)
      .then(data => {
        const rating = getAverageRating(data.data)
        this.setState({'rating': rating})
      })
      .catch(err => {
        console.error('Problem getting rating', err)
      })
  }

  render(){
    if(!this.state.isFullscreen){
      return(
        <article className="flexRow">
          <Gallery
            images={this.props.currentStyle.photos}
            handleFullscreen={this.handleFullscreen}
            isFullscreen={this.state.isFullscreen}
            ClickTracker={this.props.ClickTracker}
          />
          <section className="Style_Selector">
            <article className="info">
              <div className='flexRow overview-rating'>
                {this.state.rating ?
                  <Stars filled={this.state.rating} />
                  :
                  <Stars filled={3} />
                }
                <a href="#reviews">Read All Reviews</a>
              </div>
              <div>
                <h4 className="category-name" >{this.props.info ? this.props.info.category : 'miscellaneous'}</h4>
                <h2 className="product-name" >{this.props.info.name || 'Coming Soon'}</h2>
                <h4>{this.formatPrice(this.props.currentStyle.original_price, this.props.currentStyle.sale_price)}</h4>
              </div>
            </article>
            <h4 className="style">Style > <span className='style-current'>{this.props.currentStyle.name || null}</span></h4>
            <div className="gridRows bubble-container">
              {this.state.bubbles}
            </div>
            <OrderForm
              inventory={this.props.currentStyle.skus}
              ClickTracker={this.props.ClickTracker}
              info={this.props.info}
              addOutfit={this.props.addOutfit}
              isAdded={this.props.isAdded}
            />
          </section>
        </article>
      )
    }
    else {
      return(
        <article className="flexRow">
          <Gallery
            images={this.props.currentStyle.photos}
            handleFullscreen={this.handleFullscreen}
            isFullscreen={this.state.isFullscreen}
            ClickTracker={this.props.ClickTracker}
          />
        </article>
      )
    }
  }
}


export default StyleSelector;