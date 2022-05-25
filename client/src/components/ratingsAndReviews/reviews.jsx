import React from 'react';
import axios from 'axios';
import Modal from '../common/modal.jsx';
import Stars, { SelectableStars } from '../common/stars.jsx';
import ReviewTile from './reviewTile.jsx';
class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.ratingMapping = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great',
    };
    this.characteristicsMapping = {
      Size: [
        'A size too small',
        '½ a size too small',
        'Perfect',
        '½ a size too big',
        'A size too wide',
      ],
      Width: [
        'Too narrow',
        'Slightly narrow',
        'Perfect',
        'Slightly wide',
        'Too wide',
      ],
      Comfort: [
        'Uncomfortable',
        'Slightly uncomfortable',
        'Ok',
        'Comfortable',
        'Perfect',
      ],
      Quality: [
        'Poor',
        'Below average',
        'What I expected',
        'Pretty great',
        'Perfect',
      ],
      Length: [
        'Runs Short',
        'Runs slightly short',
        'Perfect',
        'Runs slightly long',
        'Runs long',
      ],
      Fit: [
        'Runs tight',
        'Runs slightly tight',
        'Perfect',
        'Runs slightly long',
        'Runs long',
      ],
    };
    this.state = {
      reviews: [],
      sort: 'relevance',
      showNewReviewModal: false,
      rating: 0,
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      photos: '',
      page: 1,
      helpful: {},
      characteristics: {},
      characteristicKeys: [],
    };
  }

  submit() {
    let missing = [];
    let canSubmit = true;
    if (this.state.body.length < 50) {
      this.setState({ errorMessage: 'body length too short' });
      canSubmit = false;
    }

    if (
      Object.keys(this.state.characteristics).length <
      this.state.characteristicKeys.length
    ) {
      missing.push('characteristics');
    }
    if (this.state.email.length === 0) {
      missing.push('email');
    }
    if (this.state.name.length === 0) {
      missing.push('name');
    }
    if (this.state.rating === 0) {
      missing.push('rating');
    }
    if (this.state.recommend === null) {
      missing.push('recommend');
    }
    if (this.state.summary.length === 0) {
      missing.push('summary');
    }
    if (missing.length > 0) {
      this.setState({
        errorMessage: 'You must enter the following: ' + missing.join(', '),
      });
    }
    const { characteristics, body, email, name, rating, recommend, summary } =
      this.state;

    if (canSubmit && missing.length === 0) {
      axios
        .post('/rating_review/' + this.props.id, {
          product_id: this.props.id,
          characteristics,
          body,
          email,
          name,
          rating,
          recommend,
          summary,
        })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          this.setState({ showNewReviewModal: false });
        })
        .catch((err) => console.error(err));
    }
  }

  loadMoreReviews() {
    this.setState({ page: this.state.page + 1 }, () => {
      axios
        .get('/rating_review/' + this.props.id, {
          params: { sort: this.state.sort, page: this.state.page },
        })
        .then((response) => {
          const reviews = this.state.reviews.concat(response.data.results);
          this.setState({ reviews });
        })
        .catch((err) => console.error(err));
    });
  }
  componentDidMount() {
    axios.get('/rating_review/' + this.props.id).then((response) => {
      this.setState({ reviews: response.data.results });
    });
    axios
      .get('/rating_review/' + this.props.id + '/rating')
      .then(({ data }) => {
        this.setState({
          characteristicKeys: Object.keys(data.characteristics),
          meta: data,
        });
      });
  }

  helpfulClicked(review_ID) {
    const review = this.state.reviews.filter(
      ({ review_id }) => review_ID === review_id
    )[0];

    review.helpfulness++;
    this.setState({
      helpful: { ...this.state.helpful, [review_ID]: true },
      reviews: this.state.reviews,
    });
  }

  render() {
    return (
      <div className="fl w-66">
        {this.state.reviews.length} reviews, sorted by{' '}
        <select
          onChange={(e) =>
            this.setState({ sort: e.target.value }, () => {
              console.log(e.target.value);
              axios
                .get(`/rating_review/${this.props.id}`, {
                  params: { sort: this.state.sort },
                })
                .then(({ data }) =>
                  this.setState({ reviews: data.results, page: 0 })
                );
            })
          }
        >
          <option>{'relevance'}</option>
          <option>{'newest'}</option>
          <option>{'helpful'}</option>
        </select>
        {this.state.reviews.map((review, i) =>
          this.props.filtered[review.rating] ||
          '12345'.split('').every((v) => !this.props.filtered[v]) ? (
            <ReviewTile
              key={i}
              helpfulClicked={this.helpfulClicked.bind(this)}
              review={review}
              helpful={this.state.helpful[review.review_id]}
            ></ReviewTile>
          ) : null
        )}
        <Modal
          show={this.state.showNewReviewModal}
          handleClose={() => this.setState({ showNewReviewModal: false })}
        >
          <h1>Write your Review</h1>
          <h2>About the TODO product name</h2>
          <SelectableStars
            select={(rating) => this.setState({ rating })}
            filled={this.state.rating}
            size={25}
          ></SelectableStars>
          {this.ratingMapping[this.state.rating]}
          <div>
            Do you recommend this product?
            <input
              type="radio"
              name="recommend"
              onChange={() => this.setState({ recommend: true })}
            />
            yes
            <input
              type="radio"
              name="recommend"
              onChange={() => this.setState({ recommend: false })}
            />
            no
          </div>
          {this.state.characteristicKeys.map((value, i) => (
            <div key={i} className="characteristics">
              <label htmlFor={value}>{value}</label>
              <div className="dib">
                <div>
                  <input
                    type="radio"
                    name={value}
                    onChange={() => {
                      this.setState({
                        characteristics: {
                          ...this.state.characteristics,
                          [this.state.meta.characteristics[value].id]: 1,
                        },
                      });
                    }}
                  />
                </div>
                {this.characteristicsMapping[value][0]}
              </div>

              <input
                type="radio"
                name={value}
                onChange={() => {
                  this.setState({
                    characteristics: {
                      ...this.state.characteristics,
                      [this.state.meta.characteristics[value].id]: 2,
                    },
                  });
                }}
              />
              <input
                type="radio"
                name={value}
                onChange={() => {
                  this.setState({
                    characteristics: {
                      ...this.state.characteristics,
                      [this.state.meta.characteristics[value].id]: 3,
                    },
                  });
                }}
              />
              <input
                type="radio"
                name={value}
                onChange={() => {
                  this.setState({
                    characteristics: {
                      ...this.state.characteristics,
                      [this.state.meta.characteristics[value].id]: 4,
                    },
                  });
                }}
              />
              <div className="dib">
                <div>
                  <input
                    type="radio"
                    name={value}
                    onChange={() => {
                      this.setState({
                        characteristics: {
                          ...this.state.characteristics,
                          [this.state.meta.characteristics[value].id]: 5,
                        },
                      });
                    }}
                  />
                </div>
                {this.characteristicsMapping[value][4]}
              </div>
            </div>
          ))}
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              placeholder="Example: Best purchase ever!"
              onChange={(e) => {
                this.setState({ summary: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              id=""
              cols="30"
              rows="10"
              placeholder="Why did you like the product or not?"
              onChange={(e) => {
                this.setState({ body: e.target.value });
              }}
            ></textarea>
            {this.state.body.length > 50
              ? 'minimum reached'
              : `Minimum required characters left: ${
                  50 - this.state.body.length
                }`}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Example: jackson11@email.com"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="name">Nickname</label>
            <input
              type="text"
              name="name"
              placeholder="Example: jackson11!"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <span id="errorMessage">{this.state.errorMessage}</span>
          <button
            id="submitNewReview"
            onClick={() => {
              this.submit();
            }}
          >
            submit review
          </button>
        </Modal>
        <button
          id="addAReview"
          onClick={() => this.setState({ showNewReviewModal: true })}
        >
          Add A Review
        </button>
        <button id="showMoreReviews" onClick={this.loadMoreReviews.bind(this)}>
          Show more reviews
        </button>
      </div>
    );
  }
}

export default Reviews;
