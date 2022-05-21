import axios from 'axios';
import React from 'react';
import Stars from '../common/stars.jsx';
var PercentBar = (props) => {
  return (
    <div className="rating">
      <div className="rating-upper bar"></div>
      <div className="rating-lower bar-lower"></div>
    </div>
  );
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
    this.state = { AverageRating: 1.33, meta: null };
  }

  componentDidMount() {
    axios
      .get(`rating_review/${this.props.id}/rating`)
      .then(({ data }) => this.setState({ meta: data }));
  }

  render() {
    return (
      <div className="ratingsContainer">
        <h1>
          {this.state.AverageRating.toFixed(1)}{' '}
          <Stars size={45} filled={this.state.AverageRating}></Stars>
        </h1>
        <p>100% of reviews recommended this product</p>
        <PercentBar />
        <Size></Size>
        <Comfort></Comfort>
      </div>
    );
  }
}

export default Ratings;
