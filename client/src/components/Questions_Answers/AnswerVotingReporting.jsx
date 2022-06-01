import React, { useState, useEffect } from 'react';
import axios from 'axios';

let AnswerVotingReporting = (props) => {
  const [voted, setVoted] = useState(false);
  const [reported, setReported] = useState(false);
  const [helpfulness, setHelpfulness] = useState(props.helpfulness);
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    let tmp = (new Date(props.date)).toDateString().split(' ').slice(1)
    tmp[1] = tmp[1].replaceAll(new RegExp("^0+(?!$)",'g'), '')
    tmp = tmp.join(', ');
    setDate(tmp.substr(0, 3) + tmp.substr(4));
  });

  function voteHelpful(event) {
    if (!voted) {
      props.clickTracker(event);
      setVoted(true);
      // request to vote helpful
      setHelpfulness(helpfulness + 1)
      axios.put(`/question_answer/voting/answer/helpful/${props.answer_id}`)
        .catch((err) => console.log(err));
    }
  }

  function report(event) {
    if (!reported) {
      props.clickTracker(event);
      setReported(true);
      // request to report
      axios.put(`/question_answer/voting/answer/report/${props.answer_id}`)
        .catch((err) => console.log(err));
    }
  }

  return (
    <div id="answer_details">
      <div className="rightBorder">by <span className={props.answerer_name === "Seller" ? "seller" : ""}>{props.answerer_name}</span>, {date}</div>
      <div className="leftBorder rightBorder">Helpful? <a id="helpfulAnswer" className="underline" onClick={voteHelpful}>Yes</a> ({helpfulness})</div>
      <div className="leftBorder"><a id="answerReporting" className="underline" onClick={report}>{reported ? 'Reported' : 'Report'}</a></div>
    </div>
  )
}

export default AnswerVotingReporting