import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Answers from './Answers.jsx';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [],
      showAnswers: false
    }
  }

  componentDidMount() {
    // get answers to question
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
      .then(answers => {
        this.setState({
          allAnswers: answers.data.results.sort((a, b) => b.helpfulness - a.helpfulness),
          dispAnswers: answers.data.results.slice(0, 2)
        })
      })
  }

  toggleAccordion(e) {
    e.preventDefault();
    this.setState((state) => {
      return {showAnswers: !state.showAnswers}
    })
  }

  render() {
    return (
      <div>
        <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>Q: {this.props.question.question_body}</button>
        <Answers
          allAnswers={this.state.allAnswers}
          showAnswers={this.state.showAnswers}
        />
      </div>
    )
  }
}

export default SingleQA;