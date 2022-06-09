import React from 'react';
import axios from 'axios';

import Overview from '../overview/Overview';
import RIC from '../RIC_Component/RIC.jsx';

import ClickTracker from '../common/ClickTracker.jsx';

class Coupler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: null,
      productId: window.location.href.split('/').pop(),
      info: null,
      styles: null,
      rating: null,
      currentRelatedProduct: null,
      relatedProducts: null,
      overviewLoading: true,
      overviewDidError: false
    };
    this.addProduct = this.addProduct.bind(this);
  }

  // from overview
  getData(id) {
    axios({
      method: 'GET',
      url: `/overview/parser/${id}`,
    })
    .then((res) => {
      this.setState({
        info: res.data.info,
        styles: res.data.styles.results,
        rating: res.data.rating,
        loading: false
      });
    })
    .catch(err => {
      this.setState({
        overviewDidError: true,
        loading: false
      })
      console.log('Error Contacting Endpoint:', err)
    })
  }

  // from realted items
  getRelatedItems(id) {
    axios.get(`/related_items/ric/${id}`)
    .then(response => {
      return response.data
    })
    .then(allProducts => {
      let currentProduct = allProducts.slice(0, 1);
      let relatedProducts = allProducts.slice(1, allProducts.length);
      return [this.setDefaultStyle(currentProduct, 'outfit')[0], this.setDefaultStyle(relatedProducts, 'related')];
    })
    .then(allProducts => {
      this.setState({
        addProduct: null,
        currentRelatedProduct: allProducts[0],
        relatedProducts: allProducts[1]
      }, () => {
        let outfits = JSON.parse(localStorage.getItem('Outfit')) || [];
        for (const outfit of outfits) {
          if (outfit.id === Number(this.state.productId)) {
            this.addProduct();
            break;
          }
        }
      });
    })
    .catch(err => { console.error('Something broke'); });
  }

  // something that sets default related items?
  setDefaultStyle(products, list) {
    products.forEach(product => {
      product.styles.forEach(style => {
        if (style['default?']) {
          product.thumbnail = style.photos[0].thumbnail_url;
          product.sale_price = style.sale_price;
          product.list = list;
        }
      })
      if (product.thumbnail === null || product.thumbnail === undefined) {
        product.thumbnail = product.styles[0].photos[0].thumbnail_url;
        product.sale_price = product.styles[0].sale_price;
        product.list = list;
      }
    })
    return products;
  }


  async componentDidMount(){
    await this.getData(this.state.productId)
    await this.getRelatedItems(this.state.productId);

  }

  addProduct() {
    let opposite = !this.state.addProduct;
    localStorage.setItem('Add Product', opposite);
    this.setState({ addProduct: opposite })
  }

  render() {
    const RI = ClickTracker(RIC, 'Related Items');
    const OVR = ClickTracker(Overview, 'Overview');
    return (
      <div>
        <OVR
          info={this.state.info}
          styles={this.state.styles}
          rating={this.state.rating}
          productId={this.state.productId}
          addOutfit={this.addProduct}
          isAdded={this.state.addProduct}
          isLoading={this.state.overviewLoading}
          didError={this.state.overviewDidError}
        />
        <RI
          added={this.state.addProduct}
          addProduct={this.addProduct}
          currentProduct={this.state.currentRelatedProduct}
          relatedProducts={this.state.relatedProducts}
          currentProductId={this.state.productId}
        />
      </div>
    );
  }
}

export default Coupler;
