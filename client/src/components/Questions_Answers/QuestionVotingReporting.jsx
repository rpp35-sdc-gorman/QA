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

  function addAnswer() {

  }


  return (
    <div id="question_details">
      <span>Helpful? <a id="helpful" onClick={voteHelpful}>Yes</a> ({helpfulness})    |    </span>
      <span><a id="addAnswer" onClick={addAnswer}>Add Answer</a></span>
    </div>
  )
}

export default QuestionVotingReporting