import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SingleQA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [],
      dispAnswers: [],
      showAnswers: false
    }

    this.loadMoreAnswers.bind(this);
  }

  componentDidMount() {
    // get answers to question
    axios.get(`/question_answer/answers/${this.props.question.question_id}`)
      .then(answers => {
        this.setState({
          allAnswers: answers.data.results.sort((a, b) => b.helpfulness - a.helpfulness),
          dispAnswers: answers.data.results.slice(0, 2)
        })
      })
  }

  toggleAccordion(e) {
    e.preventDefault();
    this.setState((state) => {
      return {showAnswers: !state.showAnswers}
    })
  }

  loadMoreAnswers() {
    let curLen = this.state.dispAnswers.length;
    let newLen = Math.min(curLen + 2, this.state.allAnswers.length);
    console.log(curLen, newLen);
    this.setState((state, props) => {
      return {
        dispAnswers: state.allAnswers.slice(0, newLen),
        showAnswers: true
      }
    })
  }

  render() {
    return (
      <div>
        <button className="accordion" onClick={(e) => this.toggleAccordion(e)}>Q: {this.props.question.question_body}</button>
        {this.state.dispAnswers.map(answer => {
          return (
            <div key={answer.answer_id} className={this.state.showAnswers ? "panel active": "panel"}>
              <p>A: {answer.body}</p>
              <p>{answer.answerer_name} {answer.helpfulness}</p>
              {/* convert to component for showing answer/answerer details and reporting */}
              {/* include component for images */}
            </div>
          )
        })}
        <a className={(this.state.showAnswers && this.state.allAnswers.length > 2
        && this.state.dispAnswers.length !== this.state.allAnswers.length) ? "panel active": "panel"}
        id="load" onClick={this.loadMoreAnswers.bind(this)}>See more answers</a>
      </div>
    )
  }
}

export default SingleQA;