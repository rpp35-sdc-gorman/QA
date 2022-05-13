import React, { useState } from 'react';

var Answers = (props) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  let toggle;
  if (props.allAnswers.length === 0) {
    toggle = <div></div>
  } else if (!expanded && props.allAnswers.length > 2) {
    toggle = <div className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>See more answers</div>
  } else if (expanded && props.allAnswers.length > 2) {
    toggle = <div className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>Collapse answers</div>
  }

  return (
    <div id="answers" style={{overflow: 'scroll', maxHeight:'50vh'}} >
      {props.allAnswers.map((answer, i) => {
        if (expanded) {
          return (
            <div key={answer.answer_id} className={props.showAnswers ? "panel active": "panel"}>
              <p>A: {answer.body}</p>
              <p>{answer.answerer_name} {answer.helpfulness}</p>
              {/* convert to component for showing answer/answerer details and reporting */}
              {/* include component for images */}
            </div>
          )
        } else {
          return (
            <div key={answer.answer_id} className={(props.showAnswers && i < 2) ? "panel active": "panel"}>
              <p>A: {answer.body}</p>
              <p>{answer.answerer_name} {answer.helpfulness}</p>
              {/* convert to component for showing answer/answerer details and reporting */}
              {/* include component for images */}
            </div>
          )
        }
      })}
      {toggle}
    </div>
  )
}

export default Answers;
