import React, {useState} from 'react';
import axios from 'axios';

var AddAnswer = (props) => {
  const [answer, setAnswer] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    // send request to add answer
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && answer && nickname) {
      axios.post(`/question_answer/addAnswerTo/${props.questionToAnswer.question_id}`, {
        body: answer,
        name: nickname,
        email
      })
      .then((result) => props.toggleAddAnswer('update successful'))
      .catch(err => console.log(err));
    } else {
      setEmail(false);
    }
  }

  function handleChange(event) {
    // let value = _.escape(event.target.value);
    let value = event.target.value;
    if (event.target.id === 'answer') {
      setAnswer(value);
    } else if (event.target.id === 'nickname') {
      setNickname(value);
    } else if (event.target.id === 'email') {
      setEmail(value);
    }
  }

  function setCustomValidity(text, e) {
    if (text !== '') {
      e.target.setCustomValidity(`${text}: ${e.target.id}`)
    } else {
      e.target.setCustomValidity('')
    }
  }

  function closeModal(e) {
    e.preventDefault();
    props.toggleAddAnswer();
  }

  return (
    props.showAddAnswer ?
    <div className="modalAnswers">
      <form onSubmit={handleSubmit} id="modal-form">
        <h2>Submit your Answer</h2>
        <h3>{props.currentProduct}: {props.questionToAnswer.question_body}</h3>
        <label>Your Answer:
          <textarea  id="answer" value={answer} onChange={handleChange} maxLength={1000} required
            onInvalid={(e) => setCustomValidity('You must enter the following', e)}
            onInput={(e) => setCustomValidity('', e)}/>
          <p>Characters left: {1000 - answer.length}/1000</p>
        </label>

        <label>What is your nickname?
          <input type="text" id="nickname" value={nickname} onChange={handleChange} maxLength={60} placeholder="Example: jack543!" required
            onInvalid={(e) => setCustomValidity('You must enter the following', e)}
            onInput={(e) => setCustomValidity('', e)}/>
          <p>For privacy reasons, do not use your full name or email address</p>
        </label>

        <label>What is your email?
          <input type="text" id="email" value={(email === false) ? '' : email} maxLength={60} onChange={handleChange} required
            onInvalid={(e) => setCustomValidity('You must enter the following', e)}
            onInput={(e) => setCustomValidity('', e)}/>
          <p>For authentication reasons, you will not be emailed</p>
          {(email === false) ? <div>Invalid email address</div> : <></>}
        </label>

        <input id="submitAnswer" type="submit" value="Submit" style={{width: '80px', marginTop: '5px'}}/>
        <button id="closeAddAnswer" onClick={closeModal}>X</button>
      </form>
    </div> : <></>
  )
}

export default AddAnswer;