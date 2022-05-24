// ratingsAndReviews.jsx;
import React from 'react';
import Ratings from './ratings.jsx';
import Reviews from './reviews.jsx';
class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    };
  }

  render() {
    return (
      <div>
        <Ratings
          id={71697}
          filter={(count) => {
            this.setState({ [count]: !this.state[count] });
          }}
        ></Ratings>
        <div className="reviewsContainer">
          <Reviews id={71697} filtered={this.state}></Reviews>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
