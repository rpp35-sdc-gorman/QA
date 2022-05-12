import React, { useState } from 'react';

var Answers = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [scrollable, setScrollable] = useState(false);


  function expand() {
    props.loadMoreAnswers(expanded);
    setExpanded(!expanded);
  }

  let toggle;
  if (!expanded && props.dispAnswers.length > 0) {
    toggle = <div className={props.showAnswers ? "panel active": "panel"} id="load" onClick={expand}>See more answers</div>
  } else {
    toggle = <div className={props.showAnswers ? "panel active": "panel"} id="load" onClick={expand}>Collapse answers</div>
  }

  return (
    <div id="answers" >
      {props.dispAnswers.map(answer => {
        return (
          <div key={answer.answer_id} className={props.showAnswers ? "panel active": "panel"}>
            <p>A: {answer.body}</p>
            <p>{answer.answerer_name} {answer.helpfulness}</p>
            {/* convert to component for showing answer/answerer details and reporting */}
            {/* include component for images */}
          </div>
        )
      })}
      {toggle}
    </div>
  )
}

export default Answers;