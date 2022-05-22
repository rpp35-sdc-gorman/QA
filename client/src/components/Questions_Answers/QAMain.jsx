import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SingleQA from './SingleQA.jsx';
import AddQuestion from './AddQuestion.jsx';

class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      showAllQuestions: false,
      showAddQuestion: false,
      newQuestion: null,
      page_num: 1,
      hasMoreQuestions: true
    };

    this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/71697`, { params: {page_num: this.state.page_num}})
      .then(questions => {
        let hasMoreQuestions = true;
        if (questions.data.results.length < 2) {
          hasMoreQuestions = false;
        }
        this.setState({
          questions: questions.data.results.sort((a,b) => b.question_helpfulness - a.question_helpfulness),
          hasMoreQuestions
        })
      })
  }

  loadMoreQuestions() {
    axios.get(`/question_answer/questions/71697`, { params: {page_num: this.state.page_num + 1}})
      .then(questions => {
        if (questions.data.results.length > 0) {
          this.setState((state) => {
            const updatedQuestions = state.questions.concat(questions.data.results);
            return {
              page_num: state.page_num + 1,
              questions: updatedQuestions.sort((a,b) => b.question_helpfulness - a.question_helpfulness),
            }
          }, () => {
            // check next page to see if more questions left to load
            axios.get(`/question_answer/questions/71697`, { params: {page_num: this.state.page_num + 1}})
              .then(questions => {
                if (questions.data.results.length === 0) {
                  this.setState({
                    hasMoreQuestions: false
                  })
                }
              })
          })
        }
      })
  }

  toggleAddQuestion(updated) {
    if (updated) {
      this.loadMoreQuestions();
    }
    console.log('yoyo', updated);
    this.setState((state) => ({
      showAddQuestion: !state.showAddQuestion
    }))
  }

  render() {
    // create component to render QAs in accordion
    var loadMoreQuestions = <button id="questionToggle" onClick={this.loadMoreQuestions}>More Answered Questions</button>

    return (
      <div>
        <div id="QA">
          <AddQuestion
            toggleAddQuestion={(updated) => this.toggleAddQuestion(updated)} // closes modal
            productToQuestion={'current product name'} // tmp variable for product name
            product_id={71697}
            showAddQuestion={this.state.showAddQuestion}
          />

          {(this.state.questions.length) ? this.state.questions.map(question =>
            <SingleQA key={question.question_id} question={question} currentProduct={'current product name'}/>
          ) : <></>}
        </div>
        {this.state.hasMoreQuestions ? loadMoreQuestions : <></>}
        <button onClick={() => this.toggleAddQuestion()}>Add Question</button>
      </div>
    )
  }
}

export default QAMain