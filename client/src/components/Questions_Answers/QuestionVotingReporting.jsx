import React, { useState, useEffect } from 'react';
import axios from 'axios';

let QuestionVotingReporting = (props) => {
  const [voted, setVoted] = useState(false);
  const [helpfulness, setHelpfulness] = useState(props.helpfulness);

  function voteHelpful() {
    if (!voted) {
      setVoted(true);
      // request to vote helpful
      setHelpfulness(helpfulness + 1)
      axios.put(`/question_answer/helpful/question/${props.question_id}`)
        .catch((err) => console.log(err));
    }
  }

  return (
    <div id="question_details">
      <div className="rightBorder">Helpful? <a id="helpfulQuestion" className="underline" onClick={voteHelpful}>Yes</a> ({helpfulness})</div>
      <div className="leftBorder"><a id="addAnswerButton" className="underline" onClick={() => props.toggleAddAnswer()}>Add Answer</a></div>
    </div>
  )
}

export default QuestionVotingReporting