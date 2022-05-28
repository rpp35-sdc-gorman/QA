import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Answers from './Answers.jsx';
import QuestionVotingReporting from './QuestionVotingReporting.jsx';
import AddAnswer from './AddAnswer.jsx';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [],
      showAnswers: true,
      showAddAnswer: false,
      questionToAnswer: null,
    }

    this.toggleAddAnswer = this.toggleAddAnswer.bind(this);
  }

  componentDidMount() {
    // get answers to question
    let allAnswers = [];
    let seller = this.props.question.answers.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
    if (seller) {
      allAnswers = allAnswers.concat(seller);
    }
    this.setState((state) =>  ({
      allAnswers: allAnswers.concat(this.props.question.answers.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    // get answers to question
    if (prevState.allAnswers.length !== this.props.question.answers.length) {
      let allAnswers = [];
      let seller = this.props.question.answers.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
      if (seller) {
        allAnswers = allAnswers.concat(seller);
      }
      this.setState((state) =>  ({
        allAnswers: allAnswers.concat(this.props.question.answers.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
      }))
    }
  }

  toggleAccordion(event) {
    event.preventDefault();
    this.props.clickTracker(event);
    this.setState((state) => {
      return {showAnswers: !state.showAnswers}
    })
  }

  toggleAddAnswer(event) {
    this.props.clickTracker(event);
    if (event.target.id === 'modal-form') {
      this.props.reload();
    }
    let tmp = !this.state.showAddAnswer;
    this.setState({showAddAnswer: tmp})
  }

  render() {
    let question = this.props.question;
    return (
      <div id="singleQA">
        <AddAnswer
            toggleAddAnswer={(event) => this.toggleAddAnswer(event)} // closes modal
            questionToAnswer={this.props.question}
            currentProduct = {this.props.currentProduct}
            showAddAnswer={this.state.showAddAnswer}
          />
        <div id="question">
          <button className="accordion" onClick={(event) => this.toggleAccordion(event)}>
            Q: {this.props.question.question_body}
          </button>
          <QuestionVotingReporting
            question_id={this.props.question.question_id}
            helpfulness={this.props.question.question_helpfulness}
            toggleAddAnswer={(event) => this.toggleAddAnswer(event)}
            clickTracker={this.props.clickTracker}/>
        </div>
        <Answers
          allAnswers={this.state.allAnswers}
          showAnswers={this.state.showAnswers}
          clickTracker={this.props.clickTracker}
        />
      </div>
    )
  }
}

export default SingleQA;