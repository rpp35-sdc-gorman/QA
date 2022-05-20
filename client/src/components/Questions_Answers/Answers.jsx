import React, { useState } from 'react';
import AnswerVotingReporting from './AnswerVotingReporting.jsx';

var Answers = (props) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  let toggle;
  if (props.allAnswers.length === 0) {
    toggle = <a></a>
  } else if (!expanded && props.allAnswers.length > 2) {
    toggle = <a className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>See more answers</a>
  } else if (expanded && props.allAnswers.length > 2) {
    toggle = <a className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>Collapse answers</a>
  }

  let page = props.allAnswers.map((answer, i) => {
    if (props.showAnswers && expanded) {
      return (
        <div key={answer.answer_id} className="panel active">
          <div id="answer">
            <p id="answer_label">A: </p>
            <p id="answer_body">{answer.body}</p>
          </div>
          <AnswerVotingReporting
            answer_id={answer.answer_id}
            answerer_name={answer.answerer_name}
            helpfulness={answer.helpfulness}
            date={answer.date}
          />
          {/* include component for images */}
        </div>
      )
    } else if (props.showAnswers && !expanded) {
      return (
        <div key={answer.answer_id} className={(i < 2) ? "panel active": "panel"}>
          <div id="answer">
            <p id="answer_label">A: </p>
            <p id="answer_body">{answer.body}</p>
          </div>
          <AnswerVotingReporting
            answer_id={answer.answer_id}
            answerer_name={answer.answerer_name}
            helpfulness={answer.helpfulness}
            date={answer.date}
          />
          {/* include component for images */}
        </div>
      )
    } else {
      return (
        <div key={answer.answer_id} className="panel">
          <div id="answer">
            <p id="answer_label">A: </p>
            <p id="answer_body">{answer.body}</p>
          </div>
          <AnswerVotingReporting
            answer_id={answer.answer_id}
            answerer_name={answer.answerer_name}
            helpfulness={answer.helpfulness}
            date={answer.date}
          />
          {/* include component for images */}
        </div>
      )
    }
  })

  return (
    <div id="answers" >
      {props.allAnswers.length > 0 ? page : <div>No answers yet</div>}
      {toggle}
    </div>
  )
}

export default Answers;