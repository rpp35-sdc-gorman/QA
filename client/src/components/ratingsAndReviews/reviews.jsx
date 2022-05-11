import React from 'react';
import axios from 'axios';
class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      sort: 'relevance',
    };
  }

  componentDidMount() {
    axios.get('/rating_review/' + this.props.id).then((response) => {
      console.log(response);
      this.setState({ reviews: response.data.results });
    });
  }

  render() {
    return (
      <>
        {this.state.reviews.length} reviews, sorted by{' '}
        <span>{this.state.sort}</span>
        {this.state.reviews.map((review) => {
          <ReviewTile review={review}></ReviewTile>;
        })}
      </>
    );
  }
}

export default Reviews;
