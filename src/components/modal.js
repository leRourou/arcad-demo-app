import React from "react";
import '../style/modal.scss';

export default function Modal({children}) {
    return ( 
    <div id='modify-container'>
        {children}
    </div>
    )
}