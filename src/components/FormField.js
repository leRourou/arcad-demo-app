import React, { useState, useEffect } from "react";
import Tooltip from './tooltip';

// Form field component
function FormField(props) {
	const { forHtml, label, value, tooltip, inputType, onChange, options, step, min, max, regex } = props;
	const [fieldValue, setFieldValue] = useState(value);

	const placeholder = value;

	useEffect(() => {
		setFieldValue(value);
	}, [value]);

	function renderSwitch() {
		switch (inputType) {
			case "select":
				return (
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
				);

			case "textarea":
				return (
					<textarea
						className="modify-textarea"
						placeholder={placeholder}
						value={fieldValue}
						onChange={
							e => {
								setFieldValue(e.target.value);
								onChange && onChange(e);
							}
						}
					/>
				);

			case "date":
				return (
					<input
						className="modify-field"
						type={inputType}
						placeholder={placeholder}
						value={fieldValue}
						onChange={
							e => {
								setFieldValue(e.target.value);
								onChange && onChange(e);
							}
						}
					/>
				);

			case "number":
				return (
					<input
						className="modify-field"
						type={inputType}
						placeholder={placeholder}
						value={fieldValue}
						step={step}
						min={min}
						max={max}
						regex={regex}
						onChange={
							e => {
								setFieldValue(e.target.value);
								onChange && onChange(e);
							}
						}
					/>
				);

			case "text":
				return (
					<input
						className="modify-field"
						type={inputType}
						placeholder={placeholder}
						value={fieldValue}
						onChange={
							e => {
								setFieldValue(e.target.value);
								onChange && onChange(e);
							}
						}
					/>
				);

			default:
				return (
					<></>
				)
		}
	}


	return (
		<div>
			<LabelField htmlFor={forHtml} label={label} />
			{tooltip}
			{renderSwitch()}
		</div>
	);
}

// Number field component
export function NumberField(props) {

	const { forHtml, label, value, tooltip, step, min, max, regex } = props;

	function handleChange(event) {
		// Regex validation
		if (regex && regex.test(event.target.value)) {
			event.target.className = 'modify-field';
		} else {
			event.target.className = 'modify-field invalid-field';
		}
		props.onChange(event);
	};

	return (
		<FormField
			forHtml={forHtml}
			label={label}
			value={value}
			tooltip={<Tooltip content={tooltip} />}
			inputType="number"
			onChange={handleChange}
			min={min}
			step={step}
			max={max}
			regex={regex}
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
			onChange={props.onChange}
		/>
	);
}

// Text area component
export function TextAreaField(props) {
	const { forHtml, label, value, tooltip } = props;

	return (
		<FormField
			forHtml={forHtml}
			label={label}
			value={value}
			tooltip={<Tooltip content={tooltip} />}
			inputType="textarea"
			onChange={props.onChange}
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
			onChange={props.onChange}
		/>
	);
}

export function DateField(props) {
	const { forHtml, label, value, tooltip } = props;

	return (
		<FormField
			forHtml={forHtml}
			label={label}
			value={value}
			tooltip={<Tooltip content={tooltip} />}
			inputType="date"
			onChange={props.onChange}
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