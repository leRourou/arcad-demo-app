import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective-subtle.css';

export default function Tooltip(props) {
    if (!props.content) return null
    const content = props.content;

    return (
        <span>
            <Tippy
                content={content}
                placement="top-start"
                duration={300}
                offset={[0,7]}
                interactive='true'
                theme="tooltip-field"
                allowHTML='true'
                animation='perspective-subtle'
            >
                <img className='info-icon' src='http://localhost:3000/images/info.svg' alt="tooltip info icon"></img>
            </Tippy>
        </span>
    );
}