import React, {
	InputHTMLAttributes,
	ReactElement,
	useRef,
	forwardRef,
	Ref,
	ForwardedRef,
} from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	ref?: ForwardedRef<HTMLInputElement>;
}

function Input({ value, type, ref, ...props }: Props): ReactElement {
	const inputRef = ref ? ref : useRef<HTMLInputElement>(null);

	return <StyleInput value={value} type={type} ref={inputRef} {...props} />;
}

export default forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
	return <Input {...props} ref={ref} />;
});

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
