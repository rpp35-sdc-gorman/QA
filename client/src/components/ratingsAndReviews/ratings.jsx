import axios from 'axios';
import React from 'react';
import Stars from '../common/stars.jsx';
var PercentBar = (props) => {
  return (
    <div className="rating">
      <div
        className="rating-upper bar"
        style={{ width: props.fill + '%' }}
      ></div>
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
    this.state = { AverageRating: 1.33, meta: {} };
  }

  componentDidMount() {
    axios
      .get(`rating_review/${this.props.id}/rating`)
      .then(({ data }) => this.setState({ meta: data }));
  }

  render() {
    const total = this.state.meta.ratings
      ? Object.values(this.state.meta.ratings).reduce(
          (a, b) => parseInt(a) + parseInt(b)
        )
      : 100;
    console.log(this.state.meta, total);

    return (
      <div className="ratingsContainer">
        <h1>
          {this.state.AverageRating.toFixed(1)}{' '}
          <Stars size={45} filled={this.state.AverageRating}></Stars>
        </h1>
        <p>100% of reviews recommended this product</p>
        {'12345'.split('').map((count) =>
          this.state.meta.ratings ? (
            <div>
              {count + ' Stars'}
              <PercentBar
                key={count}
                fill={((this.state.meta.ratings[count] || 0) / total) * 100}
              />
            </div>
          ) : null
        )}
      </div>
    );
  }
}

export default Ratings;
