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
      showBack: true,
      showNext: false,
      cardWidth: 250
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    let numDisplayedCards = Math.floor(900/this.state.cardWidth);
    let showBack = false;
    let showNext = !(React.Children.count(this.props.children) > numDisplayedCards);
    this.setState({
      numDisplayedCards,
      showBack,
      showNext,
      increment: (1 / numDisplayedCards)
    })
  }

  updateIndex (nextIndex) {
    let maxDisplayed = React.Children.count(this.props.children) / this.state.numDisplayedCards;
    if (nextIndex >= maxDisplayed) {
      nextIndex = maxDisplayed;
    }
    let showBack = (Math.round(nextIndex * 100) / 100) <= 1 ? false : true;
    let showNext = (Math.round(nextIndex * 100) / 100) >= (Math.round(maxDisplayed * 100) / 100) ? true : false;
    this.setState({
      showBack,
      showNext,
      calculatedIndex: nextIndex
    });
  }

  render() {
    let back = <button id='back' onClick={() => { this.updateIndex(this.state.calculatedIndex - this.state.increment)}}>Back</button>;
    let next = <button id='next' onClick={() => { this.updateIndex(this.state.calculatedIndex + this.state.increment)}}>Next</button>;
    return (
      <div className='carousel'>
        <div className='carousel_inner' style={{ transform: `translateX(-${(this.state.calculatedIndex - 1) * 100}%)`}}>
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, { width: `${this.state.cardWidth}px`});
          })}
        </div>
        <div className='indicators'>
          {this.state.showBack ? back : null}
          {!this.state.showNext ? next : null}
        </div>
      </div>
    );
  }
};

export default Carousel;