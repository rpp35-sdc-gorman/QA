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

  componentDidMount() {}

  render() {
    const paths = window.location.pathname.split('/');
    const id = paths[paths.length - 1];

    return (
      <div id="ratings_reviews">
        <Ratings
          id={id}
          filter={(count) => {
            this.setState({ [count]: !this.state[count] });
          }}
          filtered={this.state}
        ></Ratings>
        <div className="reviewsContainer" id="reviews">
          <Reviews id={id} filtered={this.state}></Reviews>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
