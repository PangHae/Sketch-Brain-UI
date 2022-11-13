/* eslint-disable no-unused-vars */
import React, { MouseEvent, ReactElement } from 'react';
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import Button from '../common/Button';
import { LayerDiv } from './Layer';

interface Props {
	key: string;
	name: string;
	index: number;
	onClick: (index: number) => void;
	onClickDelete: (index: number) => void;
}

function AddedLayer({ name, index, onClick, onClickDelete }: Props): ReactElement {
	return (
		<LayerDiv onClick={() => onClick(index)}>
			{name}
			<Button
				style={{
					position: 'absolute',
					width: '20px',
					height: '20px',
					right: '-5px',
					top: '-5px',
					padding: 0,
				}}
				onClick={(e) => onClickDelete(index)}
			>
				<TiDelete size={20} />
			</Button>
		</LayerDiv>
	);
}

export default AddedLayer;
