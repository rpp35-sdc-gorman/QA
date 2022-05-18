// this is the order form used to add things to the card

import React from 'react';
import {useState} from 'react';
import {Star} from 'akar-icons';

const OrderForm = (props) => {


  return(
    <form>
      <div>
        <select>
          <option>Select Size</option>
        </select>
        <select>
          <option>1</option>
        </select>
      </div>
      <div>
        <button>ADD TO BAG</button>
        <button>
          <Star size={32} />
        </button>
      </div>
    </form>
  )

}

export default OrderForm;