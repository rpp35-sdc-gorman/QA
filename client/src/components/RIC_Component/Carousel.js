import React from 'react';

export const CarouselItem = ({ children, width }) => {
  return (
    <div className='carousel_item' style={{ width: width }}>
      {children}
    </div>
  );
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatedIndex: 1,
      numDisplayedCards: null,
      increment: null,
      cardWidth: 275
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    let numDisplayedCards = Math.floor(900/this.state.cardWidth);
    this.setState({
      numDisplayedCards,
      increment: (1 / numDisplayedCards)
    })
  }

  updateIndex (nextIndex) {
    let maxDisplayed = React.Children.count(this.props.children) / this.state.numDisplayedCards;
    if (nextIndex < 0) {
      nextIndex = 0;
    } else if (nextIndex >= maxDisplayed) {
      nextIndex = maxDisplayed;
    }
    this.setState({
      calculatedIndex: nextIndex
    });
  }

  render() {
    return (
      <div className='carousel'>
        <div className='carousel_inner' style={{ transform: `translateX(-${(this.state.calculatedIndex - 1) * 100}%)`}}>
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, { width: `${this.state.cardWidth}px`});
          })}
        </div>
        <div className='indicators'>
          <button onClick={() => { this.updateIndex(this.state.calculatedIndex - this.state.increment)}}>Back</button>
          <button onClick={() => { this.updateIndex(this.state.calculatedIndex + this.state.increment)}}>Next</button>
        </div>
      </div>
    );
  }
};

export default Carousel;