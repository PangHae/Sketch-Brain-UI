import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value?: string;
}

const Button = ({ className, value, children, ...props }: Props) => (
	<StyledButton value={value} {...props}>
		{children && children}
		{value}
	</StyledButton>
);

export default Button;

const StyledButton = styled.button`
	display: inline-block;
	width: 80px;
	font-size: 14px;
	height: 36px;
	text-align: center;
	border: none;
	border-radius: 8px;
	padding: 8px 12px;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	-ms-border-radius: 8px;
	-o-border-radius: 8px;
	background-color: #492dd6;
	color: white;
	&:hover {
		background-color: #3922ac;
		cursor: pointer;
	}
`;
