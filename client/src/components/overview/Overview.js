// this is the Parent Overview Component

import React from 'react';

import ProductInfo from './ProductInfo';
import Gallery from './Gallery';
import StyleSelector from './StyleSelector';

import sendRequest from '../../../../server/lib/sendRequest';

class Overview extends React.Component{
  constructor(props){
    super()
    this.state={
      products: null,
      currentProduct: null,
      didError: false,
      error: null,
    }
  }

  componentDidMount(){
    sendRequest('products')
      .then(res => {
        console.log(res)
        this.setState({products: res.data})
      })
      .catch(err => {
        this.setState({
          didError: true,
          error: err
        })
      })
    // set current Prodct to be the first product in the list
    this.setState({currentProduct: this.state.products[0]})
  }

  render(){
    return(
      <section>
        <h1>Overview Widget</h1>
        <Gallery />
        <ProductInfo products={this.state.products} />
        <StyleSelector product={this.state.currentProduct}/>
      </section>
    )
  }
}

export default Overview;