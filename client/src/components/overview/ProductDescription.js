
import React from 'react';
import {Check} from 'akar-icons';
import keyId from '../common/keyId';

//static display - shouldn't need much work as long as data is correct
function ProductDescription (props) {

  // this freaks out if props are slow to update
  // so I gave it the option to do nothing if there was no data
  return (props.info ?
    <article className='ProductDescription'>
      <div className='description'>
        <h3>{props.info.slogan}</h3>
        <p>{props.info.description}</p>
      </div>
      <ul className="features">
        { props.info.features ?
          props.info.features.map(item => {
            return <li className="feature" key={keyId()}><Check size={16}/>{item.value}</li>
          })
          :
          null
        }
      </ul>
    </article>
    :
    null
  )

}

export default ProductDescription;