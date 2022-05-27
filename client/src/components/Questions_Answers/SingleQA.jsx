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
    this.updateAnswerHelpfulness = this.updateAnswerHelpfulness.bind(this);
  }

  componentDidMount() {
    // get answers to question
    axios.get(`/question_answer/answers/${this.props.question.question_id}`, {params: {count: 100}})
      .then(answers => {
        let allAnswers = [];
        let seller = answers.data.results.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
        if (seller) {
          allAnswers = allAnswers.concat(seller);
        }
        this.setState((state) =>  ({
          allAnswers: allAnswers.concat(answers.data.results.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
        }))
      })
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
    if (event.target.id === 'submitAnswer') {
      axios.get(`/question_answer/answers/${this.props.question.question_id}`, {params: {count: 100}})
        .then(answers => {
          let allAnswers = [];
          let seller = answers.data.results.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
          if (seller) {
            allAnswers = allAnswers.concat(seller);
          }
          this.setState((state) =>  ({
            allAnswers: allAnswers.concat(answers.data.results.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
            showAddAnswer: !state.showAddAnswer
          }))
        })
    } else {
      let tmp = !this.state.showAddAnswer;
      this.setState({showAddAnswer: tmp})
    }
  }

  updateAnswerHelpfulness() {
    axios.get(`/question_answer/answers/${this.props.question.question_id}`, {params: {count: 100}})
      .then(answers => {
        let allAnswers = [];
        let seller = answers.data.results.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
        if (seller) {
          allAnswers = allAnswers.concat(seller);
        }
        this.setState((state) =>  ({
          allAnswers: allAnswers.concat(answers.data.results.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
        }))
      })
  }

  render() {
    let question = this.props.question;
    return (
      <div id="singleQA">
        <AddAnswer
            toggleAddAnswer={(event) => this.toggleAddAnswer(event)} // closes modal
            questionToAnswer={question}
            currentProduct = {this.props.currentProduct}
            showAddAnswer={this.state.showAddAnswer}
          />
        <div id="question">
          <button className="accordion" onClick={(event) => this.toggleAccordion(event)}>
            Q: {question.question_body}
          </button>
          <QuestionVotingReporting
            question_id={question.question_id}
            helpfulness={question.question_helpfulness}
            toggleAddAnswer={(event) => this.toggleAddAnswer(event)}
            clickTracker={this.props.clickTracker}/>
        </div>
        <Answers
          allAnswers={this.state.allAnswers}
          showAnswers={this.state.showAnswers}
          updateAnswerHelpfulness={this.updateAnswerHelpfulness}
          clickTracker={this.props.clickTracker}
        />
      </div>
    )
  }
}

export default SingleQA;