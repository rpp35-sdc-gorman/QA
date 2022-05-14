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
      currentIndex: 0,
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (nextIndex) {
    if (nextIndex < 0) {
      nextIndex = React.Children.count(this.props.children) - 1;
    } else if (nextIndex >= React.Children.count(this.props.children)) {
      nextIndex = 0;
    }
    this.setState({ currentIndex: nextIndex });
  }

  render() {
    return (
      <div className='carousel'>
        <div className='carousel_inner' style={{ transform: `translateX(-${this.state.currentIndex * 100/3}%)`}}>
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, { width: '33%'});
          })}
        </div>
        <div className='indicators'>
          <button onClick={() => { this.updateIndex(this.state.currentIndex - 1)}}>Back</button>
          <button onClick={() => { this.updateIndex(this.state.currentIndex + 1)}}>Next</button>
        </div>
      </div>
    );
  }
};

export default Carousel;