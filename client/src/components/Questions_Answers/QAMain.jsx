import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SingleQA from './SingleQA.jsx';
import AddQuestion from './AddQuestion.jsx';
import Search from './Search.jsx';

class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      filterTerm: '',
      end: 2,
      showAddQuestion: false,
      newQuestion: null,
      hasMoreQuestions: true
    };

    this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/71697`, { params: {count: 100, page_num: 1}})
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

  loadMoreQuestions(event) {
    this.props.clickTracker(event);
    this.setState((state) => ({
      end: state.end + 2,
      hasMoreQuestions: (state.questions.length - (state.end + 2) <= 0) ? false : true
     }))
  }

  toggleAddQuestion(event) {
    this.props.clickTracker(event);
    if (event.target.id === 'submitQuestion') {
      this.loadMoreQuestions();
    }
    let tmp = !this.state.showAddQuestion;
    this.setState({showAddQuestion: tmp})
  }

  setFilter(filterTerm) {
    filterTerm = filterTerm.toLowerCase();
    if (filterTerm.length >= 3) {
      this.setState({
        filterTerm
      })
    } else {
      this.setState({
        filterTerm: ''
      })
    }
  }

  render() {
    // create component to render QAs in accordion
    var loadMoreQuestions = <button id="questionToggle" onClick={this.loadMoreQuestions}>More Answered Questions</button>

    return (
      <div id="QAMain">
        <AddQuestion
          toggleAddQuestion={(event) => this.toggleAddQuestion(event)} // closes modal
          productToQuestion={'current product name'} // tmp variable for product name
          product_id={71697}
          showAddQuestion={this.state.showAddQuestion}
        />

        <Search setFilter={(filterTerm) => this.setFilter(filterTerm)}/>
        <div id="QABody">
          {(this.state.questions.length) ? this.state.questions.filter(question => question.question_body.toLowerCase().includes(this.state.filterTerm)).slice(0, this.state.end).map(question =>
            <SingleQA key={question.question_id} question={question} currentProduct={'current product name'} clickTracker={this.props.clickTracker}/>
          ) : <></>}
        </div>
        {this.state.hasMoreQuestions ? loadMoreQuestions : <></>}
        <button onClick={(event) => this.toggleAddQuestion(event)}>Add Question</button>
      </div>
    )
  }
}

export default QAMain