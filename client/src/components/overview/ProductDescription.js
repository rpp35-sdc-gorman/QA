
import React from 'react';


//static display - shouldn't need much work as long as data is correct
function ProductDescription (props) {


  return(
    <article className='ProductDescription'>
      <div className='description'>
        <h3>Product Slogan. Lorem ipsum dolor sit amet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum. Feugiat scelerisque varius morbi enim.</p>
      </div>
      <ul>
        <li>et tortor consequat id porta</li>
        <li>et tortor consequat id porta</li>
        <li>et tortor consequat id porta</li>
      </ul>
    </article>
  )
}

export default ProductDescription;