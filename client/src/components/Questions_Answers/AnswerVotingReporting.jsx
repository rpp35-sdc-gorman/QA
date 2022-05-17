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

  function voteHelpful() {
    if (!voted) {
      setVoted(true);
      // request to vote helpful
      setHelpfulness(helpfulness + 1)
      axios.put(`/question_answer/helpful/answer/${props.answer_id}`)
        .catch((err) => console.log(err));
    }
  }

  function report() {
    if (!reported) {
      setReported(true);
      // request to report
      axios.put(`/question_answer/reported/answer/${props.answer_id}`)
        .catch((err) => console.log(err));
    }
  }

  return (
    <div id="answer_details">
      <span>by {props.answerer_name}, {date}    |    </span>
      <span>Helpful? <a id="helpful" onClick={voteHelpful}>Yes</a> ({helpfulness})    |    </span>
      <span><a id="report" onClick={report}>{reported ? 'Reported' : 'Report'}</a></span>
    </div>
  )
}

export default AnswerVotingReporting