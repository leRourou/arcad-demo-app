import React, { useState, useEffect } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective.css';

// Form field component
function FormField(props) {
    const { forHtml, label, value, tooltip, inputType, onChange, options } = props;
    const [fieldValue, setFieldValue] = useState(value);

    // TODO: Add validation for input fields
    //const [valid, setValid] = useState(true);
    const placeholder = value;

    useEffect(() => {
        setFieldValue(value);
    }, [value]);

    return (
        <div>
            <LabelField htmlFor={forHtml} label={label} />
            {tooltip}
            {inputType === "select" ? (
                <select
                    className='modify-select'
                    value={fieldValue}
                    onChange={
                        e => setFieldValue(e.target.value)
                    }
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                </select>

            ) : (

                <input
                    className="modify-field"
                    type={inputType}
                    placeholder={placeholder}
                    value={fieldValue}
                    step="0.01"
                    min="0"
                    max="1000000"
                    onChange={
                        e => {
                            setFieldValue(e.target.value);
                            onChange && onChange(e);
                        }
                    }
                />
            )}
        </div>
    );
}

// Icon component
function Tooltip(props) {
    if (!props.content) return null
    const content = props.content;

    return (
        <span>
            <Tippy 
                content={content}
                placement="top-start"
                duration={300}
                offset={[-3,-5]}
                interactive='true'
                theme="tooltip-field"
                allowHTML='true'
                animation='perspective'
            >
                <img className='info-icon' src='http://localhost:3000/images/info.svg' alt="tooltip info icon"></img>
            </Tippy>
        </span>
    );
}

// Number field component
export function NumberField(props) {

    const { forHtml, label, value, tooltip } = props;

    const regexPrice = /\d+\.\d{2}/;

    function handleChange(event) {
        if (regexPrice.test(event.target.value)) {
            event.target.style.borderColor = '#3498db';
        } else {
            event.target.style.borderColor = '#e74c3c';
        }
    };

    return (
        <FormField
            forHtml={forHtml}
            label={label}
            value={value}
            tooltip={<Tooltip content={tooltip} />}
            inputType="number"
            onChange={handleChange}
        />
    );
}

// Text field component
export function TextField(props) {
    const { forHtml, label, value, tooltip } = props;

    return (
        <FormField
            forHtml={forHtml}
            label={label}
            value={value}
            tooltip={<Tooltip content={tooltip} />}
            inputType="text"
        />
    );
}

// Select component
export function SelectField(props) {
    const { forHtml, label, value, options, tooltip } = props;

    return (
        <FormField
            forHtml={forHtml}
            label={label}
            value={value}
            tooltip={<Tooltip content={tooltip} />}
            inputType="select"
            options={options}
        />
    );
}

// Label component
export function LabelField(props) {
    const { forHtml, label } = props;

    return (
        <label className='field-label' htmlFor={forHtml}>{label}</label>
    )
}