// this is the order form used to add things to the card

import React from 'react';
import {useState} from 'react';
import {Star, Plus} from 'akar-icons';
import sendRequest from '../../../../server/lib/sendRequest';
import keyId from '../common/keyId';

const OrderForm = (props) => {

  // sku ID for submission
  const [sku, setSku] = useState('');
  // max availible  - for verification
  const [quantityLimiter, setQuantityLimiter] = useState(null);
  // quntity user picks
  const [quantity, setQuantity] = useState(null);
  // drop down options
  const [ quantityOptions, setQuantityOptions ] = useState([<option key={12341239847}>1</option>])
  // form error status
  const [error, setError] = useState(null)

  // create drop down sizing options
  const createOptions = () => {
    let options = [];
    for(let item in props.inventory){
      const opt = < option key={keyId()} value={item} >{props.inventory[item].size}</option>
      options.push(opt)
    }
    return options
  }

  // create quantity options and set the limitor when a SKU is set
  const createInventory = (id) => {

    const itemInfo = props.inventory[id];

    const opts = []
    if(itemInfo.quantity < 1){
      opts.push(<option value="" key={keyId()}>OUT OF STOCK</option>)
    } else {
      for(let i = 1; i < itemInfo.quantity; i++){
        opts.push(<option key={keyId()} value={i}>{i}</option>)
      }
    }
    setQuantityOptions(opts);
    setQuantityLimiter(props.inventory[id].quantity)
    setQuantity(1);
  }

  // user state change size
  const handleSizeChange = (e) => {
    props.ClickTracker(e)
    setSku(e.target.value);
    createInventory(e.target.value);
  }

  // user state change qunatity
  const handleQuantityChange = (e) => {
    props.ClickTracker(e);
    setQuantity(e.target.value);
  }

  // user submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    props.ClickTracker(e)
    if(verifyUserInput()){
      const formData = {'sku_id': sku}
      const path='cart'
      sendRequest(path, 'POST', formData);
    }
    location.reload();
  }

  // user favorited event
  const handleFavorite = (e) => {
    e.preventDefault();
    props.addOutfit();
    // props.ClickTracker(e)
  }

  // make sure user has filled in some data with not impossible values
  // return true/false
  const verifyUserInput = () => {
    // check quantity
    if(quantity > quantityLimiter){
      setError("We don'thave enough stock for that, try fewer items")
      return false
    }
    // check size
    if(!sku){
      setError("Please select a size")
      return false
    }
    return true
  }

  return(
    <article className="OrderForm" onSubmit={event.preventDefault()}>
       {error? <span className="form-error">{error}</span> : null}
      <div className="flexRow input-group">
        <select
          value={sku}
          className="dropdown"
          id="size" onChange={(e) => handleSizeChange(e)}
          aria-label="Select Size"
          >
          <option key={keyId()} value={''}>Select Size</option>
          {
            createOptions()
          }
        </select>
        <select className="dropdown" id="quantity" onChange={(e) => handleQuantityChange(e)}>
          {
            quantityOptions || null
          }
        </select>
      </div>
      <div className="flexRow input-group">
        { quantityLimiter !== 0 ?
          <button aria-label="Add to Bag" onClick={(e) => handleSubmit(e)} className="flexRow order-submit-button">
            <span>ADD TO BAG</span> <Plus size="16" />
          </button>
          :
          null
        }
        <button aria-label="Add to My Outifts" className="order-favorite-button" onClick={ (e) => handleFavorite(e) }>
          <Star size={32} style={ props.isAdded ?{fill: 'yellow'} : null } />
        </button>
      </div>
    </article>
  )

}

export default OrderForm;