import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SingleQA from './SingleQA.jsx';


class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      showAllQuestions: false,
    };
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/71697`)
      .then(QAs => {
        this.setState({
          questions: QAs.data.results.sort((a,b) => b.question_helpfulness - a.question_helpfulness)
        })
      })
  }

  toggleQuestions() {
    this.setState((state) => ({
      showAllQuestions: !state.showAllQuestions
    }))
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
          {(this.state.questions.length) ? this.state.questions.slice(0, end).map(question =>
            <SingleQA key={question.question_id} question={question}/>
          ) : <></>}
          {(this.state.questions.length > 2 && !this.state.showAllQuestions) ? toggleQuestions : <></>}
          <button>Add A Question</button>
        </div>
    )
  }
}

export default QAMain