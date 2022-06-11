import React from 'react';

var Banner = (props) => {
  return (
    <div id="banner">
      <img alt="logo image" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
      <div id="fakeSearch">
        <input type="text" placeholder="This doesn't really do anything..." />
        <i className="fa fa-search"></i>
      </div>
    </div>
  )
}

export default Banner;