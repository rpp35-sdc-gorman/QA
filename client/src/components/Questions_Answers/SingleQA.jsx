import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Answers from './Answers.jsx';
import QuestionVotingReporting from './QuestionVotingReporting.jsx';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [],
      showAnswers: true
    }
  }

  componentDidMount() {
    // get answers to question
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
      .then(answers => {
        this.setState({
          allAnswers: answers.data.results.sort((a, b) => b.helpfulness - a.helpfulness),
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
    let question = this.props.question;
    return (
      <div id="singleQA">
        <div id="question">
          <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>
            Q: {question.question_body}
          </button>
            <QuestionVotingReporting question_id={question.question_id} helpfulness={question.question_helpfulness}/>
        </div>
        <Answers
          allAnswers={this.state.allAnswers}
          showAnswers={this.state.showAnswers}
        />
      </div>
    )
  }
}

export default SingleQA;