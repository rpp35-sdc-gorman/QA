import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import Overview from './components/overview/Overview';
import QAMain from './components/Questions_Answers/QAMain.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RIC from './components/RIC_Component/RIC.jsx';

import ClickTracker from './components/common/ClickTracker.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: false,
      productId: window.location.href.split('/').pop(),
      info: null,
      styles: null,
      rating: null,
      currentRelatedProduct: null,
      relatedProducts: null
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
      });
    })
    .catch(err => {
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
        currentRelatedProduct: allProducts[0],
        relatedProducts: allProducts[1]
      });
    })
    .catch(err => { console.error('Something broke'); });
  }

  // something that sets default related  items?
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


  componentDidMount(){
    this.getData(this.state.productId)
    this.getRelatedItems(this.state.productId);
  }

  addProduct() {
    let opposite = !this.state.addProduct;
    this.setState({ addProduct: opposite })
  }


  render() {
    const QA = ClickTracker(QAMain, 'Question & Answer');
    const RI = ClickTracker(RIC, 'Related Items');
    const OVR = ClickTracker(Overview, 'Overview')
    return (
      <div>
        <OVR
          info={this.state.info}
          styles={this.state.styles}
          rating={this.state.rating}
          productId={this.state.productId}
          addOutfit={this.addProduct}
          isAdded={this.state.addProduct}
        />
        <RI
          added={this.state.addProduct}
          currentProduct={this.state.currentRelatedProduct}
          relatedProducts={this.state.relatedProducts}
          currentProductId={this.state.productId}
        />
        <QA />
        <RatingsAndReviews />
      </div>
    );
  }
}

root.render(<App />);
