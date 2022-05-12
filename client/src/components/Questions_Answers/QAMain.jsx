import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SingleQA from './SingleQA.jsx';

class QAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
          }
        }
      }]
    };
  }

  componentDidMount() {
    // get initial QA list from server;
    // axios.get(`/question_answer/questions/64620`)
    //   .then(QAs => {
    //     this.setState({
    //       questions: QAs.data.results
    //     })
    //   })
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