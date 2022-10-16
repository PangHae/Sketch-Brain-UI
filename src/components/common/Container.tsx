import React, { ReactElement } from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;

	background-color: gray;
`;

const MenuDiv = styled.div`
	width: 300px;
	height: 100vh;
	background-color: #492dd6;
	color: white;
`;

const SubMenuDiv = styled.div`
	width: 250px;
	height: calc(100vh - 50px);
	padding: 25px;
	background-color: rgb(233, 237, 252);
	overflow: hidden;
`;

const ContentDiv = styled.div`
	height: calc(100vh - 100px);
	padding: 50px;
	background-color: white;
	overflow-y: scroll;
`;

interface Props {
	useSubMenu: boolean;
	children: ReactElement;
}

function Container({ useSubMenu, children }: Props): ReactElement {
	return (
		<WrapperDiv>
			<MenuDiv>{children.props.children[0]}</MenuDiv>
			{useSubMenu && <SubMenuDiv>{children.props.children[1]}</SubMenuDiv>}
			<ContentDiv style={{ width: useSubMenu ? 'calc(100vw - 700px)' : 'calc(100vw-400px)' }}>
				{children.props.children[children.props.children.length - 1]}
			</ContentDiv>
		</WrapperDiv>
	);
}

export default Container;
