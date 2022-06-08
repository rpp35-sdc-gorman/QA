import React from 'react';
import axios from 'axios';
import Modal from '../common/modal.jsx';
import Stars, { SelectableStars } from '../common/stars.jsx';
import ReviewTile from './reviewTile.jsx';
import { sendClickTracker } from './../common/ClickTracker.jsx';
export const characteristicsMapping = {
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

var randomString = function (len) {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz1234567890';

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

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
      photos: new Set(),
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
    const {
      characteristics,
      body,
      email,
      name,
      rating,
      recommend,
      summary,
      photos,
    } = this.state;

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
          photos: Array.from(photos),
          summary,
        })
        .then(({ data }) => {
          this.setState({ showNewReviewModal: false });
        })
        .catch((err) => console.error(err));
    }
  }

  setCharacteristic(value, number) {
    return (e) => {
      sendClickTracker(e, 'rating and review');
      this.setState({
        characteristics: {
          ...this.state.characteristics,
          [this.state.meta.characteristics[value].id]: number,
        },
      });
    };
  }

  loadMoreReviews(e) {
    sendClickTracker(e, 'rating and review');
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
  toggleImage(event) {
    event.preventDefault();
    sendClickTracker(event, 'ratings and reviews');
    this.setState({
      displayImage: event.target.src,
      showImage: !this.state.showImage,
    });
  }
  reportClicked(review_ID) {
    const review = this.state.reviews.filter(
      ({ review_id }) => review_ID === review_id
    )[0];
    review.reported = true;
    this.setState({
      reviews: this.state.reviews,
    });
  }

  render() {
    return (
      <div className="fl w100">
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
        <div id="QAsearch">
          <input
            type="text"
            name="keyword Search"
            id="keywordSearch"
            placeholder="Search Reviews by Keyword"
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                this.setState({ search: e.target.value });
              } else {
                this.setState({ search: undefined });
              }
            }}
          />
          <i className="fa fa-search"></i>
        </div>
        <div className="vh100 scroll">
          {this.state.reviews.map((review, i) => {
            const filtered =
              ((this.props.filtered[review.rating] ||
                '12345'.split('').every((v) => !this.props.filtered[v])) &&
                !this.state.search) ||
              review.body.includes(this.state.search);
            return filtered ? (
              <ReviewTile
                key={i}
                helpfulClicked={this.helpfulClicked.bind(this)}
                reportClicked={this.reportClicked.bind(this)}
                review={review}
                helpful={this.state.helpful[review.review_id]}
              ></ReviewTile>
            ) : null;
          })}
        </div>
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
              id="recommend1"
              type="radio"
              name="recommend"
              onChange={(e) => {
                sendClickTracker(e, 'rating and review');
                this.setState({ recommend: true });
              }}
            />
            yes
            <input
              id="recommend2"
              type="radio"
              name="recommend"
              onChange={(e) => {
                sendClickTracker(e, 'rating and review');
                this.setState({ recommend: false });
              }}
            />
            no
          </div>
          {this.state.characteristicKeys.map((value, i) => (
            <div key={i} className="characteristics">
              <label htmlFor={value}>{value}</label>
              <div className="dib">
                <div>
                  <input
                    id={value + 1}
                    type="radio"
                    name={value}
                    onChange={this.setCharacteristic(value, 1).bind(this)}
                  />
                </div>
                {characteristicsMapping[value][0]}
              </div>

              <input
                type="radio"
                name={value}
                onChange={this.setCharacteristic(value, 2).bind(this)}
              />
              <input
                type="radio"
                name={value}
                onChange={this.setCharacteristic(value, 3).bind(this)}
              />
              <input
                type="radio"
                name={value}
                onChange={this.setCharacteristic(value, 4).bind(this)}
              />
              <div className="dib">
                <div>
                  <input
                    type="radio"
                    name={value}
                    onChange={this.setCharacteristic(value, 5).bind(this)}
                  />
                </div>
                {characteristicsMapping[value][4]}
              </div>
            </div>
          ))}
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea
              id="reviewSummary"
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
              id="reviewBody"
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
          <label>
            {' '}
            Upload pictures:
            <input
              id="photos"
              onChange={(event) => {
                let photoPromises = [];
                let photoUrlSet = this.state.photos.size
                  ? this.state.photos
                  : new Set();
                _.each(event.target.files, (file, key) => {
                  if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    let filename = `${randomString(10)}-${file.name}`;
                    let url = `https://1isgmttqfc.execute-api.us-east-1.amazonaws.com/FECdev/fec-images-bucket/${filename}`;
                    photoUrlSet.add(
                      `https://fec-images-bucket.s3.amazonaws.com/${filename}`
                    );
                    photoPromises.push(
                      axios({
                        method: 'PUT',
                        url,
                        data: file,
                        headers: { 'Content-Type': 'image/jpeg' },
                      })
                    );
                  }
                });
                Promise.allSettled(photoPromises).then((results) => {
                  this.setState({ photos: photoUrlSet });
                });
              }}
              type="file"
              multiple
            />
            <div id="answerImages">
              {Array.from(this.state.photos).map((photo, i) => (
                <img
                  id="newImage"
                  key={i}
                  src={photo}
                  onClick={(event) => this.toggleImage(event)}
                />
              ))}
            </div>
          </label>
          <Modal
            handleClose={(event) => this.toggleImage(event)}
            show={this.state.showImage}
          >
            <img id="displayImage" src={this.state.displayImage} />
          </Modal>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="reviewEmail"
              type="email"
              name="email"
              placeholder="Example: jackson11@email.com"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="name">Nickname</label>
            <input
              id="reviewName"
              type="text"
              name="name"
              placeholder="Example: jackson11!"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <span id="errorMessage">{this.state.errorMessage}</span>
          <button
            id="submitNewReview"
            onClick={(e) => {
              sendClickTracker(e, 'rating and review');
              this.submit(e);
            }}
          >
            submit review
          </button>
        </Modal>
        <button
          id="addAReview"
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            this.setState({ showNewReviewModal: true });
          }}
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
