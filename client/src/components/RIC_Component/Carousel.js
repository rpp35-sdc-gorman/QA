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
      carouselWidth: null,
      cardWidth: 250
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateWidth = () => {
    let carousel = document.querySelector('.carousel');
    let carouselWidth = carousel.clientWidth * 0.96;
    let numDisplayedCards = Math.floor(carouselWidth / this.state.cardWidth);
    console.log(numDisplayedCards);
    let showBack = false;
    let showNext = !(React.Children.count(this.props.children) > numDisplayedCards);
    this.setState({
      numDisplayedCards,
      increment: (1 / numDisplayedCards),
      showBack,
      showNext,
      carouselWidth
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  }

  updateIndex (event, nextIndex) {
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
    this.props.clickTracker(event);
  }

  render() {
    let back = <button id='back' className='back' onClick={(event) => { this.updateIndex(event, this.state.calculatedIndex - this.state.increment)}}>&lt;</button>;
    let next = <button id='next' className='next' onClick={(event) => { this.updateIndex(event, this.state.calculatedIndex + this.state.increment)}}>&gt;</button>;
    return (
      <div className='carousel'>
        {this.state.showBack ? back : null}
        <div className='carousel_inner' style={{ transform: `translateX(-${(this.state.calculatedIndex - 1) * 100}%)`}}>
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, { width: `${this.state.cardWidth}px`});
          })}
        </div>
        {!this.state.showNext ? next : null}
      </div>
    );
  }
};

export default Carousel;