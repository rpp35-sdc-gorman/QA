import React, { useState } from 'react';
import axios from 'axios';
import ProductCards from './ProductCard.jsx';
import Carousel, { CarouselItem } from './Carousel';

class YourOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOutfits: []
    }

  }

  addCurrentProduct() {
    if (!this.checkExistingOutfit(this.props.currentProduct.id)) {
      this.setState({
        yourOutfits: [...this.state.yourOutfits, this.props.currentProduct]
      });
    }
  }

  checkExistingOutfit(id) {
    for (var i = 0; i < this.state.yourOutfits.length; i++) {
      if (this.state.yourOutfits[i].id === id) {
        return true;
      }
    }
    return false;
  }

  removeOutfit(event) {
    let id = Number(event.currentTarget.id);
    let currentOutfits = this.state.yourOutfits;
    let updatedOutfits = [];
    for (var i = 0; i < currentOutfits.length; i++) {
      if (currentOutfits[i].id !== id) {
        updatedOutfits.push(currentOutfits[i]);
      }
    }
    this.setState({
      yourOutfits: updatedOutfits
    });
  }

  render() {
    return (
      <div>
        <Carousel>
          <CarouselItem>
            <div className="card addition" onClick={this.addCurrentProduct.bind(this)}>
              <div className="card_visual" style={{backgroundColor: 'white'}}></div>
              <div className="card_category" style={{fontSize: 'large'}}>+ ADD TO OUTFIT</div>
              <div className="card_name"></div>
              <div className="card_price"></div>
              <div className="card_rating"></div>
            </div>
          </CarouselItem>
          {this.state.yourOutfits.map((product, index) => {
            return(
              <CarouselItem key={index}>
                <ProductCards category={product.category}
                  name={product.name}
                  default_price={product.default_price}
                  sale_price={product.sale_price}
                  star_rating={product.star_rating}
                  thumbnail={product.thumbnail}
                  id={product.id}
                  list={product.list}
                  remove={this.removeOutfit.bind(this)}
                  />
              </CarouselItem>
            )
          })}
        </Carousel>
      </div>
    )
  }
}

export default YourOutfits;