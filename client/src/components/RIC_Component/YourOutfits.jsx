import React, { useState } from 'react';
import axios from 'axios';
import ProductCards from './ProductCard.jsx';
import Carousel, { CarouselItem } from './Carousel';

class YourOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOutfits: [],
      removed: null,
      added: null
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    let yourOutfits = JSON.parse(localStorage.getItem('Outfit')|| '[]');
    this.setState({ yourOutfits });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.yourOutfits, this.state.yourOutfits);
    if (this.props.added === false
      && (prevState.yourOutfits.length !== this.state.yourOutfits.length)) {
      this.removeOutfit(this.props.currentProduct.id);
    }
    if (this.props.added && (this.state.yourOutfits.length === 0 || (prevState.yourOutfits.length !== this.state.yourOutfits.length))) {
      this.addCurrentProduct();
    } else {
      return;
    }
  }

  handleAdd(event) {
    this.props.clickTracker(event);
    this.props.addProduct();
    this.addCurrentProduct();
  }

  addCurrentProduct() {
    if (!this.checkExistingOutfit(this.props.currentProduct.id)) {
      this.setState({
        yourOutfits: [...this.state.yourOutfits, this.props.currentProduct],
        added: true
      }, () => { localStorage.setItem('Outfit', JSON.stringify(this.state.yourOutfits)) });
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

  handleRemove(event) {
    this.props.clickTracker(event);
    let id = Number(event.currentTarget.id);
    this.removeOutfit(id);
    if (id === this.props.currentProduct.id) {
      this.props.addProduct();
    }
  }

  removeOutfit(id) {
    let currentOutfits = this.state.yourOutfits;
    let updatedOutfits = [];
    for (var i = 0; i < currentOutfits.length; i++) {
      if (currentOutfits[i].id !== id) {
        updatedOutfits.push(currentOutfits[i]);
      }
    }
    this.setState({
      yourOutfits: updatedOutfits,
      removed: id,
      added: false
    }, () => {
      localStorage.setItem('Outfit', JSON.stringify(this.state.yourOutfits));
   });
  }

  render() {
    let addOrRemove = this.checkExistingOutfit(this.props.currentProduct.id) ? '- REMOVE FROM OUTFITS' : '+ ADD TO OUTFIT';
    return (
      <div id='yourOutfits'>
        <Carousel clickTracker={this.props.clickTracker}>
          <CarouselItem>
            <div className="card addition" onClick={(event) => {this.handleAdd(event)}}>
              <div className="card_visual" style={{backgroundColor: 'white'}}></div>
              <div className="card_category" style={{fontSize: 'large'}}>{addOrRemove}</div>
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
                  remove={this.handleRemove}
                  redirect={this.props.redirect}
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
