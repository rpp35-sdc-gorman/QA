import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import axios from 'axios'

import Gallery from '../Gallery';


const testPhotos = [
  {
    thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
    thumbnail_url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  }
]

const photo = {
  thumbnail_url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
  url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
}

global.IS_REACT_ACT_ENVIRONMENT = true

describe("Gallery Unit Tests", () => {
  let container = null;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(document)
    container.remove();
    container = null;
  });
  it('Should Render Gallery', () => {
    act(() => {
      createRoot(container).render(<Gallery images={testPhotos} />);
    })
    expect(container.querySelector('.Gallery')).not.toBeUndefined();
    expect(container.querySelectorAll('.GalleryArrow').length).toEqual(5);
    expect(container.querySelectorAll('.Gallery_mini').length).toEqual(2);
  });
  it('Should Render Place holder if there is no data', () => {
    act(() => {
      createRoot(container).render(<Gallery />);
    })
    expect(container.querySelector('.Gallery')).not.toBeUndefined();
    expect(container.querySelectorAll('.Gallery_mini').length).toEqual(1);
  });
  it('Should change the displayed Image when increment is clicked', () => {
    // render
    act(() => {
      createRoot(container).render(<Gallery images={testPhotos} />);
    })
    // snapshot before event
    const before = container.querySelector('.Gallery').style._values['background-image']
    act(() => {
      const advance = document.getElementById('nextArrow');
      advance.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    const after = container.querySelector('.Gallery').style._values['background-image']

    // eval
    expect(before).not.toBe(after)
  });
  it('Should change the displayed image when decrement is clicked', () => {
    // render
    act(() => {
      createRoot(container).render(<Gallery images={testPhotos} />);
    })
    // snapshot before event
    const before = container.querySelector('.Gallery').style._values['background-image']
    act(() => {
      const prev = document.getElementById('prevArrow');
      prev.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    // snapshot after event
    const after = container.querySelector('.Gallery').style._values['background-image']
    // eval
    expect(before).not.toEqual(after)
  });
})