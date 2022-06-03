import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import {createRoot} from 'react-dom/client'
import { act, Simulate } from "react-dom/test-utils";

import OrderForm from '../OrderForm';

const testData = {
    "skus": {
        "2580556": {
            "quantity": 8,
            "size": "XS"
        },
        "2580557": {
            "quantity": 16,
            "size": "S"
        },
        "2580558": {
            "quantity": 17,
            "size": "M"
        },
        "2580559": {
            "quantity": 10,
            "size": "L"
        },
        "2580560": {
            "quantity": 15,
            "size": "XL"
        },
        "2580561": {
            "quantity": 6,
            "size": "XXL"
        }
    }
}

const invalidData = {
    "skus": {
        "2580556": {
            "quantity": 0,
            "size": "XS"
        },
    }
}

global.IS_REACT_ACT_ENVIRONMENT = true

const testFunction = jest.fn()

describe('Order Form Tests', () => {
    let container = null;
    let root = null

    beforeEach(() => {
        container = document.createElement('div')
        container.id='root'
        document.body.appendChild(container)
        root = createRoot(document.querySelector('#root'))
    })

    afterEach(() => {
        unmountComponentAtNode(document);
        container.remove();
        container = null;
    })

    it('Should render when given data', () => {
        act(() => {
            root.render(<OrderForm inventory={testData.skus} />, container)
        })
        const r = document.querySelector('.OrderForm')
        expect(r).not.toBeUndefined();
    })
    it('Should Be able to display an error message', () => {
        act(() => {
            root.render(<OrderForm inventory={testData.skus} ClickTracker={testFunction} />, container)
        })
        act(() => {
            const e = document.querySelector('.order-submit-button')
            e.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        const r = document.querySelector('.form-error').textContent
        expect(r).toBe('Please select a size')
        expect(testFunction).toHaveBeenCalledTimes(1);
    })
    it('Should render size selector with a event handler', () => {
        act(() => {
            root.render(<OrderForm inventory={testData.skus} ClickTracker={testFunction} />, container)
        })
        const e = document.querySelector('#size')
        expect(e).not.toBeUndefined();
        e.value = "2580561";
        act(() => {
            Simulate.change(e)
        })
        // i guess jest keeps track of how many times I have called that function
        // and it does not reset on unmount
        expect(testFunction).toHaveBeenCalledTimes(2);
    })
    it('Should render Quantity Selector with a event handler', () => {
        act(() => {
            root.render(<OrderForm inventory={testData.skus} ClickTracker={testFunction} />, container)
        })
        const e = document.querySelector('#quantity')
        expect(e).not.toBeUndefined();
        act(() => {
            e.dispatchEvent(new MouseEvent('change', {bubbles:true}))
        })
        expect(testFunction).toHaveBeenCalledTimes(3);
    })
    it('Should render Favorite with a event handler', () => {
        act(() => {
            root.render(<OrderForm inventory={testData.skus} ClickTracker={testFunction} />, container)
        })
        const e = document.querySelector('.order-favorite-button')
        expect(e).not.toBeUndefined();
        act(() => {
            e.dispatchEvent(new MouseEvent('click', {bubbles:true}))
        })
        expect(testFunction).toHaveBeenCalledTimes(4);
    })
})