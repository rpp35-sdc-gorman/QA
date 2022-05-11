import React from 'react';

let StarBreakdown = () => {
  return <></>;
};
let Size = () => {
  return <></>;
};
let Comfort = () => {
  return <></>;
};

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { AverageRating: 1.33 };
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
