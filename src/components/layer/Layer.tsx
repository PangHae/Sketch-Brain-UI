import axios from 'axios';
import React, { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import {
	EntriedLayerParameter,
	LayerItem,
	LayerParameter,
	ParsedLayerParameter,
} from '../../types';

interface Props {
	value: LayerItem;
	onClick: (data: ParsedLayerParameter[]) => void;
}

const URL = process.env.NEXT_PUBLIC_API_URL;

function Layer({ value, onClick }: Props): ReactElement {
	const [layerDataJson, setLayerDataJson] = useState<ParsedLayerParameter[]>([]);
	useQuery(
		[`${value.name}`],
		() => axios.get(`${URL}/api/server/layer/name/${value.fileName.toLowerCase()}`),
		{
			retry: 0,
			onSuccess: (response) => {
				const dataArr = Object.entries(response.data)
					.map((value: EntriedLayerParameter) => {
						const v = value[1] as LayerParameter;
						if (v.visible) {
							if (v.type === 'int' || v.type === 'float') {
								v.type = 'number';
							}
							return {
								[value[0]]: v,
							};
						}
					})
					.filter((value) => value);

				setLayerDataJson(dataArr);
			},
			onError: (error: Error) => {
				console.log(error.message);
			},
		},
	);

	const handleClickLayer = () => {
		onClick(layerDataJson);
		console.log(layerDataJson);
	};

	return <LayerDiv onClick={() => handleClickLayer()}>{value.name}</LayerDiv>;
}

export default Layer;

const LayerDiv = styled.div`
	width: 80%;
	height: 50px;
	line-height: 50px;
	margin: 10px;
	border: 1px solid rgb(159, 190, 248);
	border-radius: 5px;
	text-align: center;
	font-size: 16px;
	font-weight: 400;
	color: black;
	background-color: rgb(159, 190, 248);
	&:hover {
		cursor: pointer;
		border: 1px solid #492dd6;
		background-color: #492dd6;
		color: white;
	}
`;
