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
    };

    this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/71697`)
      .then(questions => {
        this.setState({
          questions: questions.data.results.sort((a,b) => b.question_helpfulness - a.question_helpfulness)
        })
      })
  }

  toggleQuestions() {
    this.setState((state) => ({
      showAllQuestions: !state.showAllQuestions
    }))
  }

  toggleAddQuestion(updated) {
    console.log(updated);
    if (updated) {
      axios.get(`/question_answer/questions/71697`)
        .then(questions => {
          this.setState((state) =>  ({
            questions: questions.data.results.sort((a,b) => b.question_helpfulness - a.question_helpfulness),
            showAddQuestion: !state.showAddQuestion
          }))
        })
    } else {
      this.setState((state) => ({
        showAddQuestion: !state.showAddQuestion
      }))
    }
  }

  render() {
    // create component to render QAs in accordion
    var toggleQuestions = <button id="questionToggle" onClick={this.toggleQuestions.bind(this)}>More Answered Questions</button>

    let page;
    let end = 2;
    if (this.state.questions.length <= 2 || this.state.showAllQuestions) {
      end = this.state.questions.length;
    }

    return (
        <div id="QA">
          <AddQuestion
            toggleAddQuestion={(updated) => this.toggleAddQuestion(updated)} // closes modal
            productToQuestion={'current product name'} // tmp variable for product name
            product_id={71697}
            showAddQuestion={this.state.showAddQuestion}
          />

          {(this.state.questions.length) ? this.state.questions.slice(0, end).map(question =>
            <SingleQA key={question.question_id} question={question} currentProduct={'current product name'}/>
          ) : <></>}
          {(this.state.questions.length > 2 && !this.state.showAllQuestions) ? toggleQuestions : <></>}
          <button onClick={this.toggleAddQuestion}>Add Question</button>
        </div>
    )
  }
}

export default QAMain