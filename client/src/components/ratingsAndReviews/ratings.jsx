import axios from 'axios';
import React from 'react';
import { getAverageRating } from '../common/averageRating.js';
import Stars from '../common/stars.jsx';
import { ChevronDown } from 'akar-icons';
import { characteristicsMapping } from './reviews.jsx';
import { sendClickTracker } from '../common/ClickTracker.jsx';
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
var Characteristic = (props) => {
  return (
    <div className="rating">
      <div
        className="rating-upper"
        style={{ marginLeft: props.fill + '%', width: 16 }}
      >
        <ChevronDown size={16} />
      </div>
      <div className="rating-lower bar-lower"></div>
      <div className="fl f1">{props.labels[0]}</div>
      <div className="fr f1">{props.labels[1]}</div>
    </div>
  );
};

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meta: {} };
  }

  componentDidMount() {
    axios
      .get(`/rating_review/${this.props.id}/rating`)
      .then(({ data }) => this.setState({ meta: data }));
  }

  render() {
    const total = this.state.meta.ratings
      ? Object.values(this.state.meta.ratings).reduce(
          (a, b) => parseInt(a) + parseInt(b),
          '0'
        )
      : 100;
    const recommended = this.state.meta.recommended
      ? ((100 * Number(this.state.meta.recommended.true)) / total).toFixed(1)
      : 0;
    const chosen = Object.keys(this.props.filtered).filter(
      (k) => this.props.filtered[k]
    );

    return (
      <div className="ratingsContainer">
        <h1>
          {getAverageRating(this.state.meta).toFixed(1)}{' '}
          <Stars size={30} filled={getAverageRating(this.state.meta)}></Stars>
        </h1>
        <p>{recommended}% of reviews recommended this product</p>
        {chosen.length > 0 ? (
          <p>
            Showing {chosen.join(', ')}.{' '}
            <a
              href="#"
              onClick={() => chosen.forEach((val) => this.props.filter(val))}
            >
              show all reviews
            </a>
          </p>
        ) : null}
        {this.state.meta.ratings
          ? '12345'.split('').map((count) => (
              <div
                key={count}
                id={'ratings' + count}
                className="hover-gray"
                onClick={(e) => {
                  sendClickTracker(e, 'rating and review');
                  this.props.filter(count);
                }}
              >
                <div className="fl w4">
                  {count + ' Star' + (count === '1' ? '' : 's')}
                </div>
                <PercentBar
                  fill={((this.state.meta.ratings[count] || 0) / total) * 100}
                />
              </div>
            ))
          : null}
        {this.state.meta.characteristics
          ? Object.keys(this.state.meta.characteristics).map((name, i) => (
              <div key={i}>
                <label htmlFor={name} className="fl w4">
                  {name}
                </label>
                <Characteristic
                  labels={[
                    characteristicsMapping[name][0],
                    characteristicsMapping[name][4],
                  ]}
                  fill={(100 * this.state.meta.characteristics[name].value) / 5}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default Ratings;
