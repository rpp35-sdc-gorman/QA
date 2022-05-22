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
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
      .then(answers => {
        let allAnswers = [];
        let seller = answers.data.results.filter(answer => answer.answerer_name === "Seller").sort((a, b) => b.helpfulness - a.helpfulness);
        if (seller) {
          allAnswers = allAnswers.concat(seller);
        }
        console.log(allAnswers, seller)
        this.setState((state) =>  ({
          allAnswers: allAnswers.concat(answers.data.results.filter(answer => answer.answerer_name !== "Seller").sort((a, b) => b.helpfulness - a.helpfulness)),
        }))
      })
  }

  toggleAccordion(e) {
    e.preventDefault();
    this.setState((state) => {
      return {showAnswers: !state.showAnswers}
    })
  }

  toggleAddAnswer(updated) {
    if (updated === 'addAnswer successful') {
      axios.get(`/question_answer/answers/${this.props.question.question_id}`)
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
      this.setState((state) => ({
        showAddAnswer: !state.showAddAnswer
      }))
    }
  }

  updateAnswerHelpfulness() {
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
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
            toggleAddAnswer={(updated) => this.toggleAddAnswer(updated)} // closes modal
            questionToAnswer={question}
            currentProduct = {this.props.currentProduct}
            showAddAnswer={this.state.showAddAnswer}
          />
        <div id="question">
          <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>
            Q: {question.question_body}
          </button>
          <QuestionVotingReporting question_id={question.question_id} helpfulness={question.question_helpfulness} toggleAddAnswer={() => this.toggleAddAnswer()}/>
        </div>
        <Answers
          allAnswers={this.state.allAnswers}
          showAnswers={this.state.showAnswers}
          updateAnswerHelpfulness={this.updateAnswerHelpfulness}
        />
      </div>
    )
  }
}

export default SingleQA;