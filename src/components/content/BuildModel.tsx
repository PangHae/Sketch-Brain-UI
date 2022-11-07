/* eslint-disable camelcase */
import React, { ReactElement, useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import LayerList from '../layer/LayerList';
import {
	ParsedLayerParameterList,
	ParsedLayerParameter,
	LayerParameterNameAdded,
	ErrorMessage,
	SendLayerObj,
} from '../../types';
import AddedLayer from '../layer/AddedLayer';
import GridTable from '../common/GridTable';
import Input from '../common/Input';
import Button from '../common/Button';
import requestApi from '../../utils/axios';
import Modal from '../common';

interface SendRunnable {
	api: string;
	value: SendLayerObj;
}

const URL = process.env.NEXT_PUBLIC_API_URL;

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
	position: relative;
	display: flex;
	flex-direction: column;
	width: ${(props) => props.style?.width};
	background-color: rgb(234, 237, 251);
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

function BuildModel(): ReactElement {
	const [previewDisplay, setPreviewDisplay] = useState(false);
	const [curLayerIndex, setCurLayerIndex] = useState(-1);
	const [curLayer, setCurLayer] = useState<LayerParameterNameAdded[]>([]);
	const [layerList, setLayerList] = useState<ParsedLayerParameterList[]>([]);
	const [userName, setUserName] = useState('');
	const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ message: '', messageType: '' });
	const [modalOpen, setModalOpen] = useState(false);
	const [parsedLayer, setParsedLayer] = useState<SendLayerObj>({});

	const postRunnable = useMutation(
		({ api, value }: SendRunnable) => requestApi.post(api, value).then((res) => res.data),
		{
			onSuccess: (data) => {
				console.log(data);
			},
		},
	);

	const postValid = useMutation(
		(layerData: SendLayerObj) =>
			requestApi
				.post('/api/trainer/validator/isValidLayers', layerData)
				.then((res) => res.data)
				.catch((error) => error),
		{
			onSuccess: (data) => {
				const { _links, valid } = data;

				if (valid === 'success') {
					const link = _links.save.href.replace(URL, '');
					postRunnable.mutate({ api: link, value: parsedLayer });
				}
			},
			onError: (error) => {
				console.log(error);
			},
		},
	);

	// 기존에 존재하는 Layer를 사용하기 위해 클릭으로 Layer Preview에 추가
	const handleClickLayer = (data: ParsedLayerParameter, e: MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		const newData = cloneDeep(data);
		setLayerList([...layerList, { [target.id]: newData }]);
		// setPreviewDisplay({ ...previewDisplay, visible: true });
	};

	// Layer Preview에 추가된 Layer를 클릭해 표를 화면에 표현
	const handleClickAddedLayer = (index: number) => {
		setCurLayerIndex(index);
		if (!previewDisplay) {
			setPreviewDisplay(true);
		}
	};

	const handleOnClickMakeModel = () => {
		// console.log(layerList);
		const sendData: SendLayerObj = {};

		// 유저 이름이 있는지 확인
		if (!userName) {
			setErrorMessage({ message: 'Please Input User Name.', messageType: 'Missing Input' });
			setModalOpen(true);
			return;
		}

		if (!layerList.length) {
			setErrorMessage({
				message: 'Please Select Layer to Create Model',
				messageType: 'Missing Model Layer',
			});
			setModalOpen(true);
			return;
		}
		sendData.userId = userName;
		// Layer Value들이 모두 값을 가지고 있는지 확인
		const parsedLayerList: { [key: string]: string | number | boolean }[] = [];
		layerList.forEach((layer) => {
			const layerData = Object.entries(layer)[0];
			const tmp: { [key: string]: string | number | boolean } = {};
			// eslint-disable-next-line prefer-destructuring
			tmp.name = layerData[0];
			Object.entries(layerData[1]).forEach((data) => {
				if (!data[1].default_value) {
					setErrorMessage({
						message: `Please Input Value in ${layerData[0]} => ${data[0]}`,
						messageType: 'Missing Input',
					});
					setModalOpen(true);
					return;
				}
				const layerDefaultValue = data[1].default_value;
				const defaultValueType = data[1].type;
				if (defaultValueType === 'float' || defaultValueType === 'int') {
					tmp[data[0]] = Number(layerDefaultValue);
				} else if (defaultValueType === 'boolean') {
					tmp[data[0]] = Boolean(defaultValueType);
				} else {
					tmp[data[0]] = layerDefaultValue.toString();
				}
			});
			parsedLayerList.push(tmp);
		});
		sendData.layers = parsedLayerList;
		setParsedLayer(sendData);
	};

	// 유저 이름 입력하는 함수
	const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		setUserName((target as HTMLInputElement).value);
	};

	useEffect(() => {
		if (Object.keys(parsedLayer).length) {
			postValid.mutate(parsedLayer);
		}
	}, [parsedLayer, postValid]);

	useEffect(() => {
		if (curLayer) {
			const tmpLayerList = [...layerList];
			curLayer.forEach((value) => {
				const { default_value, parameterName } = value;
				Object.values(tmpLayerList[curLayerIndex])[0]![parameterName].default_value = default_value;
			});
			setLayerList(tmpLayerList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [curLayer]);

	useEffect(() => {
		if (curLayerIndex > -1) {
			const clonedLayer = cloneDeep(layerList[curLayerIndex]);
			const layerKeyVal = Object.entries(clonedLayer);
			const row = Object.entries(layerKeyVal[0][1]).map((value) => ({
				...value[1],
				parameterName: value[0],
			}));
			setCurLayer(row);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [curLayerIndex]);

	useEffect(() => {
		if (!modalOpen) {
			setErrorMessage({ message: '', messageType: '' });
		}
	}, [modalOpen]);

	return (
		<>
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
											onClick={handleClickAddedLayer}
											index={index}
										/>
									);
								})}
							</>
						</WillAddedDiv>
						<Button
							value={'submit'}
							style={{ position: 'absolute', right: '30px', bottom: '30px' }}
							onClick={handleOnClickMakeModel}
						/>
					</BlockDiv>
					<ParameterPreviewDiv style={{ width: previewDisplay ? '550px' : '0' }}>
						{previewDisplay && <TitleDiv>Set Parameter</TitleDiv>}
						{previewDisplay && (
							<GridTable row={curLayer} setRow={setCurLayer} curLayerIndex={curLayerIndex} />
						)}
					</ParameterPreviewDiv>
				</BlockDisplayDiv>
			</ContentWrapperDiv>
			<Modal
				messageType={errorMessage.messageType}
				message={errorMessage.message}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
			/>
		</>
	);
}

export default BuildModel;