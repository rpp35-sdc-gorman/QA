// this is the Parent Overview Component

import React from 'react';


import ProductInfo from './ProductInfo';
import Gallery from './Gallery';
import ProductDescription from './ProductDescription';

import sendRequest from '../../../../server/lib/sendRequest';

// sample data - remove this later
import {testProducts} from '../../../../config';
import {testProductStyles} from '../../../../config';

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
    // sendRequest('products')
    //   .then(res => {
    //     console.log(res)
    //     this.setState({products: res.data})
    //   })
    //   .catch(err => {
    //     this.setState({
    //       didError: true,
    //       error: err
    //     })
    //   })
    this.setState({products: testProducts})
  }

  componentDidUpdate(prevProps, PrevState){
    if(PrevState.products !== this.state.products){
      // set current Prodct to be the first product in the list
      this.setState({currentProduct: this.state.products[0]})
    }
  }

  render(){
    return(
      <section className={style.Overview}>
        <div className={style.flexRow}>
          <ProductInfo
            products={this.state.products}
            currentProduct={this.state.currentProduct}
          />
          <Gallery image={testProductStyles.results[0].photos[0].thumbnail_url}/>
        </div>
        <ProductDescription />
      </section>
    )
  }
}

export default Overview;