import React, { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = ({ value, type, ...props }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return <StyleInput value={value} type={type} ref={inputRef} {...props} />;
};

export default Input;

const StyleInput = styled.input`
	box-sizing: border-box;
	display: inline-block;
	text-align: center;
	border: 1px solid #b2b2b2;
	height: 40px;
	font-size: 14px;
	padding: 3px 12px 4px 12px;
	border-radius: 8px;
	outline: none;

	&:focus,
	&:focus-visible,
	&:focus-within {
		outline: none;
		border: 1.5px solid #492dd6;
	}
`;
