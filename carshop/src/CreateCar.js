import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Car() {
  return (
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
         
          
        </div>
      )}
    </Popup>
  );
}
