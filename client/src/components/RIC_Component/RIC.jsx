import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      relatedProducts: [],
      selectedRelatedProduct: null
    }
  }

  componentDidMount() {
    axios.get('/related_items/ric/64620')
      .then(response => {
        console.log(response);
        this.setState({
          relatedProducts: response.data
        })
      })
  }

  render() {
    return(
      <div>
        <RelatedProductsList relatedProducts={this.state.relatedProducts} />
      </div>
    )
  }
}

export default RIC