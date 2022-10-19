import React, { ReactElement } from 'react';
import LayerList from '../layers/LayerList';
import styled from 'styled-components';

function BuildModel(): ReactElement {
	return (
		<ContentWrapperDiv>
			<BlockSelectDiv>
				<TitleDiv>Select Layer</TitleDiv>
				<LayerList />
			</BlockSelectDiv>
			<BlockDisplayDiv>
				<TitleDiv>Layer Preview</TitleDiv>
			</BlockDisplayDiv>
		</ContentWrapperDiv>
	);
}

export default BuildModel;

const ContentWrapperDiv = styled.div`
	display: flex;
`;

const BlockSelectDiv = styled.div`
	width: 300px;
	height: calc(100vh - 20px);
	padding: 10px;
	overflow-y: scroll;
	background-color: rgb(234, 237, 251);
`;

const BlockDisplayDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: calc(100vw - 640px);
	height: calc(100vh - 20px);
	background-color: white;
`;

const TitleDiv = styled.div`
	width: calc(100% - 20px);
	height: 40px;
	padding: 10px;
	font-size: 24px;
	font-family: 'Poppin';
	font-weight: 400;
	text-align: center;
`;
