import React, {useState} from 'react';
import axios from 'axios';

var AddAnswer = (props) => {
  const [answer, setAnswer] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    // send request to add answer
    console.log()
    axios.post(`/question_answer/addAnswerTo/${props.questionToAnswer}`, {
      body: answer,
      name: nickname,
      email
    })
    .then((result) => props.toggleAddAnswer('update successful'))
    .catch(err => console.log(err));

  }

  function handleChange(event) {
    if (event.target.id === 'answer') {
      setAnswer(event.target.value);
    } else if (event.target.id === 'nickname') {
      setNickname(event.target.value);
    } else if (event.target.id === 'email') {
      setEmail(event.target.value);
    }
  }

  return (
    props.showAddAnswer ?
    <div className="addAnswer">
      <div className="addAnswer-inner">
        <form onSubmit={handleSubmit}>
          <label>Add answer to question: {props.questionToAnswer}</label>
          <label>
            Your Answer:
            <input type="text" id="answer" value={answer} onChange={handleChange} />
          </label>
          <label>
            What is your nickname?
            <input type="text" id="nickname" value={nickname} onChange={handleChange} />
          </label>
          <label>
            What is your email?
            <input type="text" id="email" value={email} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    </div> : <></>
  )
}

export default AddAnswer;