import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';
import Layer from './Layer';
import { ParsedLayerParameter } from '../../types';

const layerList = [
	{ name: 'Activation', fileName: 'Activation' },
	{ name: 'Convolution', fileName: 'Conv2D' },
	{ name: 'Dense', fileName: 'Dense' },
	{ name: 'Drop out', fileName: 'Dropout' },
	{ name: 'Flatten', fileName: 'Flatten' },
	{ name: 'Global Average Pooling', fileName: 'GlobalAveragePooling2D' },
	{ name: 'Max Pooling', fileName: 'MaxPooling2D' },
	{ name: 'Zero Padding', fileName: 'ZeroPadding2D' },
];

interface Props {
	// eslint-disable-next-line no-unused-vars
	onClick: (data: ParsedLayerParameter, event: MouseEvent<HTMLDivElement>) => void;
}

function LayerList({ onClick }: Props): ReactElement {
	return (
		<LayerWrapperDiv>
			{layerList.map((value) => (
				<Layer key={value.fileName} value={value} onClick={onClick} />
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
