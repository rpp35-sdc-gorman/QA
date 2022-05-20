import React, { useState } from 'react';
import axios from 'axios';
import ProductsList from './ProductsList.jsx';
import Carousel, { CarouselItem } from './Carousel';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      currentProductId: '71697',
      relatedProducts: [],
      yourOutfits: [],
      selectedRelatedProduct: null
    }
  }

  componentDidMount() {
    axios.get(`/related_items/ric/${this.state.currentProductId}`)
      .then(response => {
        return response.data
      })
      .then(relatedProducts => {
        return this.setDefaultStyle(relatedProducts);
      })
      .then(relatedProducts => {
        this.setState({ relatedProducts }, () => {console.log(this.state.relatedProducts)});
      })
      .catch(err => { throw err; });
  }

  setDefaultStyle(products) {
    products.forEach(product => {
      product.styles.forEach(style => {
        if (style['default?']) {
          product.thumbnail = style.photos[0].thumbnail_url;
          product.sale_price = style.sale_price;
          product.list = 'related';
        }
      })
      if (product.thumbnail === undefined) {
        product.thumbnail = product.styles[0].photos[0].thumbnail_url;
        product.sale_price = product.styles[0].sale_price;
        product.list = 'related';
      }
    })
    return products;
  }

  addFavorite(event) {
    let id = Number(event.currentTarget.id);
    if (!this.checkExistingOutfit(id)) {
      for (var i = 0; i < this.state.relatedProducts.length; i++) {
        if (this.state.relatedProducts[i].id === id) {
          let outfit = JSON.parse(JSON.stringify(this.state.relatedProducts[i]));
          outfit.list = 'outfit';
          this.setState({
            yourOutfits: [...this.state.yourOutfits, outfit]
          });
          return;
        }
      }
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
    console.log(id);
    let currentOutfits = this.state.yourOutfits;
    let updatedOutfits = [];
    for (var i = 0; i < currentOutfits.length; i++) {
      if (currentOutfits[i].id !== id) {
        updatedOutfits.push(currentOutfits[i]);
      }
    }
    this.setState({
      yourOutfits: updatedOutfits
    }, () => { console.log(this.state.yourOutfits)});
  }

  render() {
    return (
      <div>
        <h4>RELATED PRODUCTS</h4>
        <ProductsList products={this.state.relatedProducts} favorite={this.addFavorite.bind(this)} />
        <h4>YOUR OUTFITS</h4>
        <ProductsList products={this.state.yourOutfits} remove={this.removeOutfit.bind(this)}/>
      </div>
    )
  }
}

export default RIC