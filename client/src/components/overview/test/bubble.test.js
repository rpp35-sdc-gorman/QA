import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Bubble from '../subComponents/styleBubble';

// style bubble tests

const testData = {
        "style_id": 444218,
        "name": "Forest Green & Black",
        "original_price": "140.00",
        "sale_price": null,
        "default?": true,
        "photos": [
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            }
        ],
        "skus": {
            "2580526": {
                "quantity": 8,
                "size": "XS"
            },
            "2580527": {
                "quantity": 16,
                "size": "S"
            },
            "2580528": {
                "quantity": 17,
                "size": "M"
            },
            "2580529": {
                "quantity": 10,
                "size": "L"
            },
            "2580530": {
                "quantity": 15,
                "size": "XL"
            },
            "2580531": {
                "quantity": 4,
                "size": "XL"
            }
        }
}


global.IS_REACT_ACT_ENVIRONMENT = true

const testFunction = jest.fn();

describe('Style Bubble Tests', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(document);
        container.remove();
        container = null;
    })

    it('Should render a button', () => {
        act(() => {
            render(<Bubble
                    image={testData.photos[0].thumbnail_url}
                    entity={testData.style_id}
                />, container)
        })
        const e = document.querySelector('.bubble')
        expect(e).not.toBeUndefined();
    })
    it('Should contain and image', () => {
        act(() => {
            render(<Bubble
                    image={testData.photos[0].thumbnail_url}
                    entity={testData.style_id}
                />, container)
        })
        const e = document.querySelector('img')
        console.log(document.querySelector('.bubble'))
        expect(e.src).toBe(testData.photos[0].thumbnail_url)
    })
    it('Should have a working click handler', () => {
        act(() => {
            render(<Bubble
                    image={testData.photos[0].thumbnail_url}
                    entity={testData.style_id}
                    handleStyleChange={testFunction}
                />, container)
        })
        const e = document.querySelector('button')
        act(() => {
            e.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        expect(testFunction).toHaveBeenCalledTimes(1)
    })
    it('Should have a fallback mode', () => {
        act(() => {
            render(<Bubble />, container)
        })
        const e = document.querySelector('img')
        expect(e.src).toBe('https://via.placeholder.com/150')
    })
})