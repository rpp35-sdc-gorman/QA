import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '../common/modal.jsx';
import _ from 'lodash';

var AddAnswer = (props) => {
  const [answer, setAnswer] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [photos, setPhotos] = useState(new Set())

  const [showImage, setShowImage] = useState(false);
  const [displayImage, setDisplayImage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // send request to add answer
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && answer && nickname) {
      axios.post(`/question_answer/addAnswerTo/${props.questionToAnswer.question_id}`, {
        body: answer,
        name: nickname,
        email,
        photos: Array.from(photos)
      })
      .then((result) => props.toggleAddAnswer(event))
      .catch(err => console.log(err));

    } else {
      setEmail(false);
    }
  }

  function handleChange(event) {
    let value = _.escape(event.target.value);
    if (event.target.id === 'answer') {
      setAnswer(value);
    } else if (event.target.id === 'nickname') {
      setNickname(value);
    } else if (event.target.id === 'email') {
      setEmail(value);
    } else if (event.target.id === 'photos') {
      let photoPromises = [];
      let photoUrlSet = photos.size ? photos : new Set();
      _.each(event.target.files, (file, key) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          let filename = `${props.nextAnswerId}-${file.name}`;
          let url = `https://1isgmttqfc.execute-api.us-east-1.amazonaws.com/FECdev/fec-images-bucket/${filename}`;
          // photoUrlSet.add(`https://fec-images-bucket.s3.amazonaws.com/${filename}`)
          photoUrlSet.add(`https://ik.imagekit.io/hjgl70u0q/${filename}`)
          photoPromises.push(
            axios({
              method: 'PUT',
              url,
              data: file,
              headers: {'Content-Type': 'image/jpeg' }
            })
          );
        }
      })

      Promise.allSettled(photoPromises)
        .then((results) => {
          setPhotos(photoUrlSet);
        })
    }
  }

  function toggleImage(event) {
    event.preventDefault();
    props.clickTracker(event);
    setDisplayImage(event.target.src);
    setShowImage(!showImage);
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
    setAnswer('');
    setNickname('');
    setEmail('');
    setPhotos(new Set());
    props.toggleAddAnswer(event);
  }

  return (
    props.showAddAnswer ?
    <div className="modalAnswers">
      <Modal handleClose={(event) => toggleImage(event)} show={showImage}>
        <img
          id={'displayImage'}
          src={displayImage}
          loading='lazy'
        />
      </Modal>
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

        <label> Upload pictures:
          <input id="photos" onChange={handleChange} type="file" multiple/>
          <div id="answerImages">
            {Array.from(photos).map((photo, i) => (
              <img
                id='newImage'
                key={i}
                src={`${photo}?tr=w-0.5`}
                onClick={(event) => toggleImage(event)}
                loading='lazy'
              />
            ))}
          </div>
        </label>
        <input id="submitAnswer" type="submit" value="Submit" style={{width: '80px', marginTop: '5px'}}/>
        <button id="closeAddAnswer" onClick={closeModal}>X</button>
      </form>
    </div> : <></>
  )
}

export default AddAnswer;