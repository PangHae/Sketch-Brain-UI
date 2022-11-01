import React, { ReactElement, useState, MouseEvent, ChangeEvent, useRef, useEffect } from 'react';
import LayerList from '../layer/LayerList';
import styled from 'styled-components';
import {
	ParsedLayerParameterList,
	ParsedLayerParameter,
	LayerParameterNameAdded,
} from '../../types';
import AddedLayer from '../layer/AddedLayer';
import GridTable from '../common/GridTable';
import Input from '../common/Input';
import Button from '../common/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function BuildModel(): ReactElement {
	const [previewDisplay, setPreviewDisplay] = useState(false);
	const [curLayer, setCurLayer] = useState<LayerParameterNameAdded[]>([]);
	const [layerList, setLayerList] = useState<ParsedLayerParameterList[]>([]);
	const [userName, setUserName] = useState('');

	const postLayer = useMutation((layerData) => axios.post(`/api`, layerData));

	useEffect(() => {
		console.log(curLayer);
		console.log(layerList);
	}, [curLayer]);

	const handleClickLayer = (data: ParsedLayerParameter, e: MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setLayerList([...layerList, { [target.id]: data }]);
		// setPreviewDisplay({ ...previewDisplay, visible: true });
	};

	const handleClickAddedLayer = (
		data: ParsedLayerParameter,
		index: number,
		e: MouseEvent<HTMLDivElement>,
	) => {
		if (!previewDisplay) {
			setPreviewDisplay(true);
		}
		const row = Object.entries({ ...data }).map((value) => {
			return { ...value[1], parameterName: value[0] };
		});
		setCurLayer(row);
	};

	const handleOnClickMakeModel = () => {
		postLayer.mutate();
	};

	const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		setUserName((target as HTMLInputElement).value);
	};

	return (
		<ContentWrapperDiv>
			<BlockSelectDiv>
				<TitleDiv>Select Layer</TitleDiv>
				<LayerList onClick={handleClickLayer} />
			</BlockSelectDiv>
			<BlockDisplayDiv>
				<BlockDiv style={{ width: previewDisplay ? 'calc(100% - 550px)' : '100%' }}>
					<TitleDiv>Layer Preview</TitleDiv>
					<Input
						type={'text'}
						placeholder={'User Name'}
						value={userName}
						onChange={handleChangeUserName}
						style={{ position: 'absolute', right: '40px' }}
					/>
					<WillAddedDiv>
						<>
							{layerList.map((value, index) => {
								const data = Object.entries(value)[0];
								const name = data[0];
								return (
									<AddedLayer
										key={`${name}${index}`}
										name={name}
										value={data[1]}
										onClick={handleClickAddedLayer}
										index={index}
									/>
								);
							})}
						</>
					</WillAddedDiv>
					<Button
						value={'submit'}
						style={{ position: 'absolute', right: '40px', bottom: '30px' }}
						onClick={handleOnClickMakeModel}
					/>
				</BlockDiv>
				<ParameterPreviewDiv style={{ width: previewDisplay ? '550px' : '0' }}>
					{previewDisplay && <TitleDiv>Set Parameter</TitleDiv>}
					{previewDisplay && <GridTable row={curLayer} setRow={setCurLayer} />}
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
	height: 100vh;
	overflow-y: scroll;
	background-color: rgb(234, 237, 251);
`;

const BlockDisplayDiv = styled.div`
	display: flex;
	width: calc(100vw - 600px);
	height: 100vh;
	background-color: white;
`;

const TitleDiv = styled.div`
	width: calc(100% - 20px);
	height: 40px;
	line-height: 40px;
	padding: 10px;
	font-size: 24px;
	font-family: 'Poppin';
	font-weight: 400;
	text-align: center;
`;

const BlockDiv = styled.div`
	position: relative;
	flex-direction: column;
	width: ${(props) => props.style?.width};
	background-color: white;
	transition: width 0.5s ease;
	-webkit-transition: width 0.5s ease;
	-o-transition: width 0.5s ease;
	-moz-transition: width 0.5s ease;
`;

const ParameterPreviewDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: ${(props) => props.style?.width};
	background-color: gray;
`;

const WillAddedDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100vh - 152px);
	padding: 10px;
	margin-top: 72px;
	overflow-y: scroll;
`;
