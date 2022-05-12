import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Answers from './Answers.jsx';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [
        {
          "answer_id": 8,
          "body": "What a great question!",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 8,
          "photos": [],
        },
        {
          "answer_id": 5,
          "body": "Something pretty durable but I can't be sure",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 5,
          "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ]
        },
        {
          "answer_id": 11,
          "body": "Random answer",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "Jon",
          "helpfulness": 8,
          "photos": [],
        }
      ],
      dispAnswers: [
        {
          "answer_id": 8,
          "body": "What a great question!",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 8,
          "photos": [],
        },
        {
          "answer_id": 5,
          "body": "Something pretty durable but I can't be sure",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 5,
          "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            }
          ]
        }
      ],
      showAnswers: false
    }

    this.loadMoreAnswers.bind(this);
  }

  componentDidMount() {
    // get answers to question
    // axios.get(`/question_answer/answers/${this.props.question.question_id}`)
    //   .then(answers => {
    //     this.setState({
    //       allAnswers: answers.data.results.sort((a, b) => b.helpfulness - a.helpfulness),
    //       dispAnswers: answers.data.results.slice(0, 2)
    //     })
    //   })
  }

  toggleAccordion(e) {
    e.preventDefault();
    this.setState((state) => {
      return {showAnswers: !state.showAnswers}
    })
  }

  loadMoreAnswers(isExpanded) {
    console.log('in parent', isExpanded)
    if (!isExpanded) { // if not expanded, expand
      this.setState((state, props) => {
        return {
          dispAnswers: state.allAnswers,
          showAnswers: true
        }
      })
    } else {
      this.setState((state, props) => {
        return {
          dispAnswers: state.allAnswers.slice(0, 2),
          showAnswers: true
        }
      })
    }
  }

  render() {
    return (
      <div>
        <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>Q: {this.props.question.question_body}</button>
        <Answers
          allAnswers={this.state.allAnswers}
          dispAnswers={this.state.dispAnswers}
          showAnswers={this.state.showAnswers}
          loadMoreAnswers={this.loadMoreAnswers.bind(this)}
        />
      </div>
    )
  }
}

export default SingleQA;