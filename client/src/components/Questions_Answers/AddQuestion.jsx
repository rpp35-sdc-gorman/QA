import React, {useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

var AddQuestion = (props) => {
  const [question, setQuestion] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    // send request to add answer
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && question && nickname) {
      axios.post(`/question_answer/addQuestionTo`, {
        body: question,
        name: nickname,
        email,
        product_id: Number(props.product_id)
      })
      .then((result) => {
        props.toggleAddQuestion(event)
      })
      .catch(err => console.log(err));
    } else {
      setEmail(false);
    }
  }

  function handleChange(event) {
    let value = _.escape(event.target.value);
    if (event.target.id === 'question') {
      setQuestion(value);
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

  function closeModal(event) {
    event.preventDefault();
    setQuestion('');
    setNickname('');
    setEmail('');
    props.toggleAddQuestion(event);
  }

  return (
    props.showAddQuestion ?
    <div className="modalQuestions">
      <form onSubmit={handleSubmit} id="modal-form">
        <h2>Add your Question</h2>
        <h3>About the {props.productToQuestion}</h3>
        <label>Your Question:
          <textarea  id="question" value={question} onChange={handleChange} maxLength={1000} required
            onInvalid={(e) => setCustomValidity('You must enter the following', e)}
            onInput={(e) => setCustomValidity('', e)}/>
          <p>Characters left: {1000 - question.length}/1000</p>
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

        <input id="submitQuestion" type="submit" value="Submit" style={{width: '80px', marginTop: '5px'}}/>
        <button id="closeAddQuestion" onClick={closeModal}>X</button>
      </form>
    </div> : <></>
  )
}

export default AddQuestion;