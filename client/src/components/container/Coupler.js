import React from 'react';
import axios from 'axios';

import Overview from '../overview/Overview';
import RIC from '../RIC_Component/RIC.jsx';

import ClickTracker from '../common/ClickTracker.jsx';
import {getAverageRating} from '../common/averageRating'

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
      overviewDidError: false,
      overviewGalleryPosition: 0,
      overviewMiniGalleryPosition: 0,
      overviewGalleryIsFullscreen: false,
      overviewCurrentStyle: null,
      overviewRating: null
    };
    this.addProduct = this.addProduct.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleMiniChange = this.handleMiniChange.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.getDefault = this.getDefault.bind(this);
    this.getRating = this.getRating.bind(this);
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
    this.getRating();
  }

  componentDidUpdate(prevProps, PrevState){
    if(PrevState.styles !== this.state.styles){
      this.getDefault(this.state.styles)
    }
    if(PrevState.rating !== this.state.rating){
      // this.getRating();
    }
  }

  addProduct() {
    let opposite = !this.state.addProduct;
    localStorage.setItem('Add Product', opposite);
    this.setState({ addProduct: opposite })
  }


  //-------- OverView State handlers ----------

  // main gallery state handler
  handlePhotoChange = (operator, length) => {
    if(operator === '+'){
      if(this.state.overviewGalleryPosition < length - 1){
        this.setState({overviewGalleryPosition: this.state.overviewGalleryPosition + 1})
      } else {
        // wrap to start
        this.setState({overviewMiniGalleryPosition: 0})
      }
    } else if(operator === '-'){
      if(this.state.overviewGalleryPosition > 0){
        this.setState({overviewGalleryPosition: this.state.overviewGalleryPosition - 1})
      } else {
        // wrap to end
        this.setState({overviewMiniGalleryPosition: length - 1})
      }
    }
  }

  //  mini Gallery State Handler
  handleMiniChange = (operator, length) => {
    if(operator === '-' && this.state.overviewMiniGalleryPosition > 0){
      this.setState({ overviewMiniGalleryPosition: this.state.overviewMiniGalleryPosition - 1 })
    } else if ( operator === '+' && this.state.overviewMiniGalleryPosition < length - 5 ) {
      this.setState({ overviewMiniGalleryPosition: this.state.overviewMiniGalleryPosition + 1 })
    }
  }

  // mini gallery click event
  jumpTo = (index) => {
    this.setState({overviewGalleryPosition: index})
  }

  // gallery fullscreen handler
  handleFullscreen = () => {
    this.setState({overviewGalleryIsFullscreen: !this.state.overviewGalleryIsFullscreen})
  }

  // style selctor state handler
  handleStyleChange(id) {
    // use this style id to set the current style to one that matches that id
    // should be in the current set of styles
    this.state.styles.forEach((item) => {
      if (item.style_id === id) {
        this.setState({ overviewCurrentStyle: item });
      }
    });
  }

  // get the default style
  getDefault(data) {
    const key = 'default?';
    let set = false
    if(Array.isArray(data) && data.length > 0){
      // data provided is an array and has at least one thing in it
      Array.from(data).forEach((item) => {
        if (item[key]) {
          this.setState({ overviewCurrentStyle: item });
          set = true
        }
      });
    }
    if (Array.isArray(data) && data.length > 0 && set === false) {
      // data provided is an array but a default value was not found to be true
      // just set the default to be the first value in the array
      this.setState({ overviewCurrentStyle: data[0]})
    }
  }

  // figure out product rating
  getRating = () => {
    axios.get(`/rating_review/${this.state.productId}/rating`)
      .then(data => {
        const rating = getAverageRating(data.data)
        this.setState({'overviewRating': rating})
      })
      .catch(err => {
        console.error('Problem getting rating', err)
      })
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
          galleryPosition={this.state.overviewGalleryPosition}
          miniGalleryPosition={this.state.overviewMiniGalleryPosition}
          jumpTo={this.jumpTo}
          handleMiniChange={this.handleMiniChange}
          handlePhotoChange={this.handlePhotoChange}
          handleFullscreen={this.handleFullscreen}
          isFullscreen={this.state.overviewGalleryIsFullscreen}
          currentStyle={this.state.overviewCurrentStyle}
          handleStyleChange={this.handleStyleChange}
          getDefault={this.getDefault}
          overviewRating={this.state.overviewRating}
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
