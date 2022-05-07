import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    // get initial QA list from server;
    axios.get(`/question_answer/questions/64620`)
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
        {this.state.questions.map(question => {
          return (
            <div key={question.question_id}>{question.question_body}</div>
          )
        })}
      </div>
    )
  }
}

export default QAMain