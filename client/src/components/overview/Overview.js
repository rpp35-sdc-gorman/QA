// this is the Parent Overview Component

import React from 'react';

import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';

import sendRequest from '../../../../server/lib/sendRequest';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props){
    super()
    this.state={
      styles: null,
      rating: null,
      info: null,
      currentStyle: null,
      didError: false,
      error: null,
      force: 0,
    }
    // remote this later
    this.testId = '71697'
    this.handleStyleChange = this.handleStyleChange.bind(this)
  }

  getData (endpoint) {
    axios({
      method:"GET",
      url:`http://localhost:3000/overview/parser/${endpoint}`
    })
    .then(res => {
      this.setState({
        info: res.data.info,
        styles:res.data.styles.results,
        rating:res.data.rating
      })
    })
  }


  // fetch one Id statically for now
  componentDidMount(){
    this.getData(this.testId)
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
    this.state.styles.forEach(item => {
      if(item.style_id === id){
        this.setState({currentStyle: item})
      }
    })
  }

  render(){
    return(
      <section className='Overview'>
          <ProductInfo
            styles={this.state.styles}
            currentStyle={this.state.currentStyle}
            handleStyleChange={this.handleStyleChange}
          />
        <ProductDescription info={this.state.info} />
      </section>
    )
  }
}

export default Overview;