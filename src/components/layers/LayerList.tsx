import React, { ReactElement } from 'react';
import Layer from './Layer';
import styled from 'styled-components';

const layerList = [
	{ name: 'Activation', fileName: 'Activation' },
	{ name: 'Batch Normalization', fileName: 'BatchNormalization' },
	{ name: 'Convolution', fileName: 'Conv2D' },
	{ name: 'Dense', fileName: 'Dense' },
	{ name: 'Drop out', fileName: 'Dropout' },
	{ name: 'Flatten', fileName: 'Flatten' },
	{ name: 'Global Average Pooling', fileName: 'GlobalAveragePooling2D' },
	{ name: 'Max Pooling', fileName: 'MaxPool2D' },
	{ name: 'Zero Padding', fileName: 'ZeroPadding2D' },
];

function LayerList(): ReactElement {
	return (
		<LayerWrapperDiv>
			{layerList.map((value) => (
				<Layer key={value.fileName} value={value} />
			))}
		</LayerWrapperDiv>
	);
}

export default LayerList;

const LayerWrapperDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`;
