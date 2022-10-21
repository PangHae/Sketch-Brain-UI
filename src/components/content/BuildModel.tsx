import React, { ReactElement, useState } from 'react';
import LayerList from '../layer/LayerList';
import styled from 'styled-components';
import { ParsedLayerParameter } from '../../types';

function BuildModel(): ReactElement {
	const [previewDisplay, setPreviewDisplay] = useState(false);
	const handleClickLayer = (data: ParsedLayerParameter[]) => {
		setPreviewDisplay(!previewDisplay);
	};

	const handleClickAddedLayer = () => {};

	return (
		<ContentWrapperDiv>
			<BlockSelectDiv>
				<TitleDiv>Select Layer</TitleDiv>
				<LayerList onClick={handleClickLayer} />
			</BlockSelectDiv>
			<BlockDisplayDiv>
				<BlockDiv style={{ width: previewDisplay ? '45%' : '100%' }}>
					<TitleDiv>Layer Preview</TitleDiv>
				</BlockDiv>
				<ParameterPreviewDiv style={{ width: previewDisplay ? '55%' : '0%' }}>
					{previewDisplay && <TitleDiv>Set Parameter</TitleDiv>}
				</ParameterPreviewDiv>
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
	width: calc(100vw - 620px);
	height: 100vh;
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

const BlockDiv = styled.div`
	width: ${(props) => props.style?.width};
	background-color: white;
	transition: width 0.5s linear;
`;

const ParameterPreviewDiv = styled.div`
	width: ${(props) => props.style?.width};

	background-color: gray;
`;
