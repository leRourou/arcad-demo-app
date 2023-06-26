import React from "react";
import "../style/modal.scss";


// Modal component to display a popup, closed when clicking on the black background
export default function Modal({ children, closeModal }) {
  return (
    <div id="modify-container">
      <div id="black-back" onClick={closeModal} />
      <div id="modify-view">{children}</div>
    </div>
  );
}
