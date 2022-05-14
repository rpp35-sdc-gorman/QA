import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SingleQA from './SingleQA.jsx';

class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/71697`)
      .then(QAs => {
        this.setState({
          questions: QAs.data.results
        })
      })
  }

  render() {
    // create component to render QAs in accordion
    return(
      <div>
        {(this.state.questions.length) ? this.state.questions.map(question =>
          <SingleQA key={question.question_id} question={question}/>
        ) : <></>}
        <button>Submit Question</button>
      </div>
    )
  }
}

export default QAMain