import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={show ? 'modal display-block' : 'modal display-none'}>
      <section className="modal-main">
        {show ? children : null}
        <button id="close" onClick={handleClose}>X</button>
      </section>
    </div>
  );
};

export default Modal;
