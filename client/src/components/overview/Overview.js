// this is the Parent Overview Component

import React from 'react';

import Container from './Container';
import ProductDescription from './ProductDescription';

import sendRequest from '../../../../server/lib/sendRequest';
import axios from 'axios';


class Overview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // styles: null,
      // rating: null,
      // info: null,
      currentStyle: null,
      force: 0,
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  // getData(endpoint) {
  //   axios({
  //     method: 'GET',
  //     url: `/overview/parser/${endpoint}`,
  //   })
  //   .then((res) => {
  //     this.setState({
  //       info: res.data.info,
  //       styles: res.data.styles.results,
  //       rating: res.data.rating,
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Error Contacting Endpoint:', err)
  //   })
  // }

  // // fetch one Id statically for now
  componentDidMount() {
    // this.getData(this.testId);
    this.getDefault(this.props.styles);
  }


  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.styles !== this.props.styles) {
      // set current Prodct to be the first product in the list
      this.setState({ currentProduct: this.getDefault(this.props.styles) });
    }
  }

  getDefault(data) {
    const key = 'default?';
    let set = false
    if(Array.isArray(data) && data.length > 0){
      // data provided is an array and has at least one thing in it
      Array.from(data).forEach((item) => {
        if (item[key]) {
          this.setState({ currentStyle: item });
          set = true
        }
      });
    }
    if (Array.isArray(data) && data.length > 0 && set === false) {
      // data provided is an array but a default value was not found to be true
      // just set the default to be the first value in the array
      this.setState({currentStyle: data[0]})
    }
  }

  handleStyleChange(id, e) {
    this.props.clickTracker(e)
    // use this style id to set the current style to one that matches that id
    // should be in the current set of styles
    this.props.styles.forEach((item) => {
      if (item.style_id === id) {
        this.setState({ currentStyle: item });
      }
    });
  }

  render() {
    return (
      <section className="Overview">
        <Container
          styles={this.props.styles}
          info={this.props.info}
          rating={this.props.rating}
          currentStyle={this.state.currentStyle}
          handleStyleChange={this.handleStyleChange}
          ClickTracker={this.props.clickTracker}
          addOutfit={this.props.addOutfit}
          isAdded={this.props.isAdded}
          isLoading={this.props.loading}
          didError={this.props.didError}
        />
        <ProductDescription info={this.props.info} />
      </section>
    );
  }
}

export default Overview;
