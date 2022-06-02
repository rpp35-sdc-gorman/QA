import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
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

const testFunction = jest.fn()

describe('Order Form Tests', () => {
    let container = null;
    let root = null

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(document);
        container.remove();
        container = null;
    })

    it('Should render when given data', () => {
        act(() => {
            render(<OrderForm inventory={testData.skus} />, container)
        })
        const r = document.querySelector('.OrderForm')
        expect(r).not.toBeUndefined();
    })
    it('Should Be able to display an error message', () => {
        act(() => {
            render(<OrderForm inventory={testData.sku} />, container)
        })
        act(() => {
            const e = document.querySelector('.order-submit-button')
            e.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        const r = document.querySelector('.form-error').textContent
        expect(r).toBe('Please select a size')
    })
    it('Should render size selector', () => {
        act(() => {
            render(<OrderForm inventory={testData.sku} />, container)
        })
        setTimeout(() => {
            const e = document.querySelector('#size')
            console.log(e)
            expect(e.children.length).toBe(1)
        }, 1)

    })

})