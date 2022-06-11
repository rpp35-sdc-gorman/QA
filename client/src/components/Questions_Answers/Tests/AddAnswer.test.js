import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import AddAnswer from '../AddAnswer.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('axios');
axios.post.mockResolvedValue('posted new answer');
axios.mockResolvedValue('uploaded new image');
let toggleAddAnswer = jest.fn();
let clickTracker = jest.fn();

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

it("should not be displayed on load with showAddAnswer === false", async () => {
  await act(async () => {
    createRoot(container).render(
      <AddAnswer
        toggleAddAnswer={(updated) => toggleAddAnswer(updated)} // closes modal
        questionToAnswer={{...exampleData.question, 'answers': exampleData.answers}}
        currentProduct = {'current product name'}
        showAddAnswer={false}
        clickTracker={(event) => clickTracker(event)}
      />);
  });
  expect(container.querySelectorAll('.modalAnswers').length).toEqual(0);
});
describe('Unit tests on opened Add Answer modal', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <AddAnswer
          toggleAddAnswer={(updated) => toggleAddAnswer(updated)} // closes modal
          questionToAnswer={{...exampleData.question, 'answers': exampleData.answers}}
          currentProduct = {'current product name'}
          showAddAnswer={true}
          clickTracker={(event) => clickTracker(event)}
        />);
    });
  });

  it("should display modal on Add Answer when showAddAnswer prop is true with proper text", () => {
    expect(container.querySelector('h2').textContent).toBe('Submit your Answer');
    expect(container.querySelector('h3').textContent).toBe(`current product name: ${exampleData.question.question_body}`);
    expect(container.querySelectorAll('.modalAnswers').length).toEqual(1);
  });

  it("should call closeModal and subsequently toggleAddAnswers on close button click", async () => {
    // click close modal button
    await act(async () => {
      container.querySelector('button#closeAddAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(toggleAddAnswer).toBeCalledWith(expect.objectContaining({target: container.querySelector('button#closeAddAnswer')}));
  });

  it("should have 4 input fields displayed, with first 3 beingrequired", () => {
    expect(container.querySelectorAll('.modalAnswers form label').length).toBe(4);

    container.querySelectorAll('.modalAnswers form label').forEach((label, i) => {
      if (i < 3) {
        expect(label.children[0].hasAttribute('required')).toBe(true);
      }
    })
  });

  it("should have four input fields displayed with char limits in place for first 3", () => {
    expect(container.querySelectorAll('.modalAnswers form label').length).toBe(4);
    expect(Number(container.querySelector('textarea#answer').getAttribute('maxlength'))).toBe(1000);
    expect(Number(container.querySelector('input#nickname').getAttribute('maxlength'))).toBe(60);
    expect(container.querySelector('input#nickname').getAttribute('placeholder')).toBe("Example: jack543!");
    expect(Number(container.querySelector('input#email').getAttribute('maxlength'))).toBe(60);
  });

  it("should be able to accept multiple image files only for 4th input field", async () => {
    const file1 = new File(["foo"], "chucknorris.png", { type: "image/jpeg" });
    const file2 = new File(["foo"], "chucknorris2.png", { type: "image/jpeg" });
    const file3 = new File(["foo"], "word.txt", { type: "text/plain" });
    expect(container.querySelectorAll('.modalAnswers form label')[3].children[0].type).toBe('file');
    expect(container.querySelectorAll('.modalAnswers form label')[3].children[0].hasAttribute('multiple')).toBe(true);

    // simulate upload file
    await act(async () => {
      Simulate.change(container.querySelector('input#photos'), {target: { id: 'photos', files: [file1, file2, file3] }});
    })

    expect(container.querySelectorAll('img').length).toBe(2);
  });

  it("should show thumbnail after image upload", async () => {
    const file1 = new File(["foo"], "chucknorris.png", { type: "image/jpeg" });
    // simulate upload file
    await act(async () => {
      await Simulate.change(container.querySelector('input#photos'), {target: { id: 'photos', files: [file1] }});
    })

    expect(container.querySelectorAll('img').length).toBe(1);
    expect(container.querySelector('#newImage').src).toBe('https://fec-images-bucket.s3.amazonaws.com/undefined-chucknorris.png');
    await act(async () => {
      await Simulate.click(container.querySelector('img#newImage'));
    })


    expect(axios).toBeCalled();
    expect(clickTracker).toBeCalled();
    expect(container.querySelectorAll('#displayImage').length).toBe(1);
    expect(container.querySelector('.modal-main').children[0].tagName).toBe('IMG');
    expect(container.querySelector('.modal-main img').src).toBe('https://fec-images-bucket.s3.amazonaws.com/undefined-chucknorris.png');
  });

  it("should be able to filter out duplicate files with same names to only load one", async () => {
    const file1 = new File(["foo"], "chucknorris.png", { type: "image/png" });
    const file2 = new File(["foo"], "chucknorris.png", { type: "image/png" });
    expect(container.querySelectorAll('.modalAnswers form label')[3].children[0].type).toBe('file');
    expect(container.querySelectorAll('.modalAnswers form label')[3].children[0].hasAttribute('multiple')).toBe(true);

    // simulate upload file
    await act(async () => {
      Simulate.change(container.querySelector('input#photos'), {target: { id: 'photos', files: [file1, file2] }});
    })

    expect(container.querySelectorAll('img').length).toBe(1);
  });

  it("should have field validation in place for invalid email", async () => {
    await act(() => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random answer" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "asdf" } });
    })

    await act(async () => {
      container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).not.toBeCalled();
  });

  it("should have field validation in place for invalid email", async () => {
    await act(async () => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random answer" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(async () => {
      container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).toBeCalled();
    expect(axios.post).toBeCalledWith(`/question_answer/addAnswerTo/${exampleData.question.question_id}`, {"body": "random answer", "name": "jon", "email": "a1@test.ca", "photos": []});
    expect(toggleAddAnswer).toBeCalledWith(expect.objectContaining({target: container.querySelector('form')}));
  });

  it("should escape values submitted values to prevent XSS", async () => {
    await act(async () => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "<script src='malware.js'></script>" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "<script src='jon.js'></script>" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(async () => {
      container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).toBeCalled();
    expect(axios.post).toBeCalledWith(`/question_answer/addAnswerTo/${exampleData.question.question_id}`, {"body": "&lt;script src=&#39;malware.js&#39;&gt;&lt;/script&gt;",
    "name": "&lt;script src=&#39;jon.js&#39;&gt;&lt;/script&gt;", "email": "a1@test.ca", "photos": []});
    expect(toggleAddAnswer).toBeCalledWith(expect.objectContaining({target: container.querySelector('form')}));
  });
})