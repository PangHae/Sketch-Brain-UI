import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Menu from './Menu';

interface Props {
	children: ReactElement;
}

function Container({ children }: Props): ReactElement {
	return (
		<WrapperDiv>
			<MenuDiv>
				<Menu />
			</MenuDiv>
			{children}
		</WrapperDiv>
	);
}

export default Container;

const WrapperDiv = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;

	background-color: gray;
`;

const MenuDiv = styled.aside`
	width: 300px;
	height: 100vh;
	background-color: #492dd6;
	color: white;
`;

// const SubMenuDiv = styled.div`
// 	width: 250px;
// 	height: calc(100vh - 50px);
// 	padding: 25px;
// 	background-color: rgb(233, 237, 252);
// 	overflow: hidden;
// `;

// const ContentDiv = styled.div`
// 	width: calc(100vw - 400px);
// 	height: calc(100vh - 100px);
// 	padding: 50px;
// 	background-color: white;
// 	overflow-y: scroll;
// `;
