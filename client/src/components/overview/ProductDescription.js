
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
        <h2 className="description-title">{props.info.slogan}</h2>
        <p>{props.info.description}</p>
      </div>
      <ul className="features">
        { props.info.features ?
          props.info.features.map(item => {
            if(item.value){
              return <li className="feature" key={keyId()}><Check size={16}/>{item.value}</li>
            }
          })
          :
          <li className="feature" key={keyId()}><Check size={16}/>High Quality</li>
        }
      </ul>
    </article>
    :
    null
  )

}

export default ProductDescription;