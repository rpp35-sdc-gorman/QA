// This is the Product Info Component

import React from 'react'


class ProductInfo extends React.Component{
  constructor(props){
    super()
    this.state= {

    }
  }



  render(){
    return(
      <article>
        <h2>ProductInfo</h2>
        {this.props.products !== null ?
          this.props.products.map((item, index) => {
            return <h3 key={index}>{item.name}</h3>
          })
          :
          null
        }
      </article>
    )
  }
}

export default ProductInfo;