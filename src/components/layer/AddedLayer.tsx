import React, { ReactElement } from 'react';
import { LayerDiv } from './Layer';

interface Props {
	key: string;
	name: string;
	// value: ParsedLayerParameter;
	index: number;
	// eslint-disable-next-line no-unused-vars
	onClick: (index: number) => void;
}

function AddedLayer({ name, index, onClick }: Props): ReactElement {
	return <LayerDiv onClick={() => onClick(index)}>{name}</LayerDiv>;
}

export default AddedLayer;
