import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import QAMain from '../QAMain.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true // stops warning: The current testing environment is not configured to support act(...)

jest.mock('axios');
let toggleAddQuestion = jest.fn();
let clickTracker = jest.fn();

var container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<QAMain clickTracker={clickTracker}/>);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests with less than 2 questions', () => {
  // Make sure to resolve with a promise
  axios.get.mockResolvedValue({'data': [ {'value': {...exampleData.question, 'answers': exampleData.answers}} ]}); // need to end with answers cause of Date part of AnswerVotingReporting in re-rendering
  it('should render one question to DOM without a "More Answered Questions" toggle', async () => {
    expect(axios.get).toBeCalledWith('/question_answer/', {"params": {"count": 100, "page_num": 1}});
    expect(container.querySelector('#questionToggle')).toBeNull();

    //displays Add Question button
    expect(container.querySelectorAll('#addQuestionButton').length).toBe(1);
    expect(container.querySelector('#addQuestionButton').textContent).toBe('Add Question');
  });
})

describe('Unit tests with more than 2 questions', () => {
  var questions3 = exampleData.APIquestion3;
  beforeAll(() => {
    questions3.data.forEach(question => {
      question.value['answers'] = exampleData.answers;
    })
    axios.get.mockResolvedValue(questions3);
  })

  it('should render one question to DOM with a "More Answered Questions" toggle', async () => {
    expect(axios.get).toBeCalled();
    expect(axios.get).toBeCalledWith('/question_answer/', {"params": {"count": 100, "page_num": 1}});
    expect(container.querySelector('#questionToggle').textContent).toBe('More Answered Questions');

    //displays Add Question button
    expect(container.querySelectorAll('#addQuestionButton').length).toBe(1);
    expect(container.querySelector('#addQuestionButton').textContent).toBe('Add Question');
  });

  it('should load more questions on "More Answered Questions" click, and turn off option to load more questions if all loaded', async () => {
    expect(axios.get).toBeCalled();
    expect(container.querySelector('#questionToggle').textContent).toBe('More Answered Questions');
    expect(container.querySelectorAll('#singleQA').length).toBe(2);

    // dispatch click to Load More Questions
    await act(async () => {
      await container.querySelector('#questionToggle').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('#singleQA').length).toBe(3);
    expect(container.querySelector('#questionToggle')).toBeNull();
  });
})

describe('Integration tests', () => {
  var questions3 = exampleData.APIquestion3;
  beforeAll(() => {
    questions3.data.forEach(question => {
      question.value['answers'] = exampleData.answers;
    })
    axios.get.mockResolvedValue(questions3);
  })

  /**  AddQuestion integration tests ***/
  it('should work with AddQuestions to open and close new modal window', async () => {
    // dispatch a click to AddQuestion
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addQuestionButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalQuestions').length).toBe(1);

    // dispatch click to close modal
    await act(async () => {
      await container.querySelector('#closeAddQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
  })

  it('should be able to add a question', async () => {
    expect(container.querySelectorAll('#singleQA').length).toBe(2);

    // Make sure to resolve with a promise
    await act(async () => axios.post.mockResolvedValue('add question success'));
    // on load GET request
    expect(axios.get).toBeCalledWith("/question_answer/", {"params": {"count": 100, "page_num": 1}});

    // dispatch a click to AddQuestion
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addQuestionButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalQuestions').length).toBe(1);

    // add question
    await act(async () => {
      await Simulate.change(container.querySelector('textarea#question'), { target: { id:"question", value: "random question" } });
      await Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      await Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(async () => {
      container.querySelector('#submitQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // should trigger a re-render of questions with a POST to add question then GET request to update
    expect(axios.post).toBeCalledWith(`/question_answer/addQuestionTo`, {"body": "random question", "name": "jon", "email": "a1@test.ca", "product_id": 0});
    expect(axios.get).toBeCalledWith("/question_answer/", {"params": {"count": 100, "page_num": 1}}); // would normally update questions list
    // expanding questions should give 3 + 1 questions total, with only 2 showing at first now but would need new mockResolvedValue to test explicitly
  })

  /**  Search integration tests ***/
  it('should not filter if search term is less than 3 chars long', async () => {
    await act(async () => {
      await Simulate.change(container.querySelector('input'), {target: {value: 'wh'}})
    })
    expect(container.querySelectorAll('#singleQA').length).toBe(2);

    // confirm total length is still 3
    await act(async () => {
      await container.querySelector('#questionToggle').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('#singleQA').length).toBe(3);
    expect(container.querySelector('#questionToggle')).toBeNull();
  })

  it('should be able to update question list based on filter in Search component', async () => {
    expect(container.querySelector('input').value).toBe('');
    expect(container.querySelectorAll('#singleQA').length).toBe(2);
    await act(async () => {
      Simulate.change(container.querySelector('input'), {target: {value: 'why'}})
    })
    expect(container.querySelectorAll('#singleQA').length).toBe(1);
    expect(container.querySelector('#singleQA #question .accordion').textContent).toBe('Q: Why is this product cheaper here than other sites?');
    expect(container.querySelector('#questionToggle')).toBeNull(); // asserts only 1 question in list
  })

  it('should not matter letter casing in search', async () => {
    await act(async () => {
      Simulate.change(container.querySelector('input'), {target: {value: 'RaNdOm'}})
    })
    expect(container.querySelectorAll('#singleQA').length).toBe(2);
    expect(container.querySelector('#questionToggle')).toBeNull(); // asserts only 2 questions in list
  })

  /*** AddAnswer Integration Tests ***/
  it('should work with AddAnswer to open and close new modal window', async () => {
    // dispatch a click to AddQuestion
    expect(container.querySelectorAll('.modalAnswers').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalAnswers').length).toBe(1);

    // dispatch click to close modal
    await act(async () => {
      await container.querySelector('#closeAddAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalAnswers').length).toBe(0);
  })

  it('should be able to add a answer', async () => {
    var questions3 = exampleData.APIquestion3;
    var questions3AddedAnswer = exampleData.APIquestion3;
    questions3.data.forEach(question => {
      question.value['answers'] = exampleData.answers;
    })
    questions3AddedAnswer.data.forEach(question => {
      question.value['answers'] = exampleData.answers2;
    })
    axios.get.mockResolvedValue(questions3AddedAnswer).mockResolvedValueOnce(questions3);
    // Make sure to resolve with a promise
    await act(async () => axios.post.mockResolvedValue('add answer success'));
    // on load GET request
    expect(axios.get).toBeCalledWith("/question_answer/", {"params": {"count": 100, "page_num": 1}});

    // dispatch a click to AddAnswer
    expect(container.querySelectorAll('.modalAnswers').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalAnswers').length).toBe(1);

    // add question
    await act(async () => {
      await Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random answer" } });
      await Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      await Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(async () => {
      await container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // should trigger a re-render of questions with a POST to add question then GET request to update
    expect(axios.post).toBeCalledWith(`/question_answer/addAnswerTo/38`, {"body": "random answer", "name": "jon", "email": "a1@test.ca", "photos": []});
    expect(axios.get).toBeCalledWith("/question_answer/", {"params": {"count": 100, "page_num": 1}}); // would normally update questions list
    // expanding questions should give 3 + 1 questions total, with only 2 showing at first now but would need new mockResolvedValue to test explicitly
  })
})