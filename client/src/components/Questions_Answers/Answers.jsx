import React, { useState } from 'react';
import AnswerVotingReporting from './AnswerVotingReporting.jsx';
import AnswerImages from './AnswerImages.jsx';
import Modal from '../common/modal.jsx';

var Answers = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [displayImage, setDisplayImage] = useState('');

  function toggleExpand(event) {
    props.clickTracker(event);
    setExpanded(!expanded);
  }

  function toggleImage(event) {
    props.clickTracker(event);
    setDisplayImage(event.target.src);
    setShowImage(!showImage);
  }

  let toggle;
  if (props.allAnswers.length === 0) {
    toggle = <section></section>
  } else if (!expanded && props.allAnswers.length > 2) {
    toggle = <section className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>See more answers</section>
  } else if (expanded && props.allAnswers.length > 2) {
    toggle = <section className={props.showAnswers ? "panel active": "panel"} id="load" onClick={toggleExpand}>Collapse answers</section>
  }
  let end;
  let page = props.allAnswers.map((answer, i) => {
    if (props.showAnswers && expanded) {
      end = props.allAnswers.length;
    } else if (props.showAnswers && !expanded) {
      end = 2;
    } else {
      end = 0;
    }
    return (
      <div key={answer.answer_id} className={(i < end) ? "panel active": "panel"}>
        <div id="answer">
          <p id="answer_body"><span id="answer_label">A: </span>{answer.body}</p>
        </div>
        <AnswerImages photos={answer.photos} toggleImage={(img) => toggleImage(img)}/>
        <AnswerVotingReporting
          answer_id={answer.answer_id}
          answerer_name={answer.answerer_name}
          helpfulness={answer.helpfulness}
          date={answer.date}
          clickTracker={props.clickTracker}
        />
      </div>
    )
  })

  return (
    <div id="answers" >
      <Modal handleClose={(event) => toggleImage(event)} show={showImage}>
        <img 
          src={displayImage}
          loading='lazy'
        />
      </Modal>
      {props.allAnswers.length > 0 ? page : <div>No answers yet</div>}
      {toggle}
    </div>
  )
}

export default Answers;