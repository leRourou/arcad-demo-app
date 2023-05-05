import React from "react";
import '../style/modal.scss';

/**
 * @module Modal
 * @category Components
 * @description A modal component
 * @param {Object} children - The children of the component
 * @returns {JSX} - The JSX code for the modal
 */
export default function Modal({children}) {
    return ( 
    <div id='modify-container'>
        {children}
    </div>
    )
}