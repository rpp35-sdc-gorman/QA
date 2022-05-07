import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount() {
    // get answers to question
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
      .then(answers => {
        this.setState({
          answers: answers.data.results
        })
      })
  }

  toggleAccordion(e) {
    e.preventDefault();
    let node = e.target.nextElementSibling;
    while (node) {
      node.classList.toggle('active');
      node = node.nextElementSibling;
    }
  }

  render() {
    return (
      <div>
        <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>{this.props.question.question_body}</button>
        {this.state.answers.map(answer => {
          return (
            <div key={answer.answer_id} className="panel">
              <p>{answer.body}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SingleQA;