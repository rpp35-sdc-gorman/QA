import React from 'react';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };
  }

  render() {
    return (
      <>
        {this.state.reviews.length} reviews, sorted by <span>Relevance</span>
        {this.state.reviews.map((review) => {
          <ReviewTile review={review}></ReviewTile>;
        })}
      </>
    );
  }
}
