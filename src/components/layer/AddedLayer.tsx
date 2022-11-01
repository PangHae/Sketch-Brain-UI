import React, { MouseEvent, ReactElement, useEffect, useMemo } from 'react';
import { ParsedLayerParameter, ParsedLayerParameterList } from '../../types';
import Input from '../common/Input';
import { LayerDiv } from './Layer';

type LayerParameter = {
	parameterName: string;
	valueType: string;
	value: string | number | boolean;
};

interface Props {
	key: string;
	name: string;
	value: ParsedLayerParameter;
	index: number;
	onClick: (data: ParsedLayerParameter, index: number, e: MouseEvent<HTMLDivElement>) => void;
}

function AddedLayer({ name, value, index, onClick }: Props): ReactElement {
	return <LayerDiv onClick={(e) => onClick(value, index, e)}>{name}</LayerDiv>;
}

export default AddedLayer;
