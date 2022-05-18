// ratingsAndReviews.jsx;
import React from 'react';
import Ratings from './ratings.jsx';
import Reviews from './reviews.jsx';
class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ratingsContainer">
          <Ratings></Ratings>
        </div>
        <div className="reviewsContainer">
          <Reviews id={71697}></Reviews>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
