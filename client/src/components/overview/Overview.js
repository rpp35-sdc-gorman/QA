// this is the Parent Overview Component

import React from 'react';


import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';

import sendRequest from '../../../../server/lib/sendRequest';


class Overview extends React.Component {
  constructor(props){
    super()
    this.state={
      styles: null,
      currentStyle: null,
      didError: false,
      error: null,
    }
    // remote this later
    this.testId = '71697'
  }


  // fetch one Id statically for now
  componentDidMount(){
    sendRequest(`products/${this.testId}/styles`)
      .then(res => {
        console.log(res)
        this.setState({styles: res.data.results})
      })
      .catch(err => {
        this.setState({
          didError: true,
          error: err
        })
      })
    // this.setState({products: testProducts})
  }

  // There will need to be another request made to get the product category, slogen, description, ect...
  //  GET /products/:product_id

  componentDidUpdate(prevProps, PrevState){
    if(PrevState.styles !== this.state.styles){
      // set current Prodct to be the first product in the list
      this.setState({currentProduct: this.getDefault()})
    }
  }

  getDefault(){
    const key = 'default?'
    Array.from(this.state.styles).forEach(item => {
      if(item[key]){
        this.setState({currentStyle: item})
      }
    })
  }

  handleStyleChange(id){
    // use this style id to set the current style to one that matches that id
    // should be in the current set of styles
    console.log(id)
  }

  render(){
    return(
      <section className='Overview'>
          <ProductInfo
            styles={this.state.styles}
            currentStyle={this.state.currentStyle}
            handleStyleChange={this.handleStyleChange}
          />
        <ProductDescription />
      </section>
    )
  }
}

export default Overview;