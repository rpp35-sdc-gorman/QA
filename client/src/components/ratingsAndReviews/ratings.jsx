import React from 'react';
import Stars from '../common/5star.jsx';
var StarBreakdown = (props) => {
  return <></>;
};
var Size = (props) => {
  return <></>;
};
var Comfort = (props) => {
  return <></>;
};

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { AverageRating: 1.33 };
  }

  render() {
    return (
      <div className="ratingsContainer">
        <h1>
          {this.state.AverageRating.toFixed(1)}{' '}
          <Stars size={45} filled={this.state.AverageRating}></Stars>
        </h1>
        <p>100% of reviews recommended this product</p>
        <StarBreakdown></StarBreakdown>
        <Size></Size>
        <Comfort></Comfort>
      </div>
    );
  }
}

export default Ratings;
