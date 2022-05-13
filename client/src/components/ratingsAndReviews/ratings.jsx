import React from 'react';

var StarBreakdown = () => {
  return <></>;
};
var Size = () => {
  return <></>;
};
var Comfort = () => {
  return <></>;
};

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AverageRating: 1.25
    }
  }

  render() {
    return (
      <>
        <h1>{this.state.AverageRating.toFixed(1)}</h1>
        <p>100% of reviews recommended this product</p>
        <StarBreakdown></StarBreakdown>
        <Size></Size>
        <Comfort></Comfort>
      </>
    );
  }
}

export default Ratings;
