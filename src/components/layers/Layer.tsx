import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { Layer } from '../../types';
interface Props {
	value: Layer;
}

const URL = process.env.NEXT_PUBLIC_API_URL;

function Layer({ value }: Props): ReactElement {
	const queryClient = useQueryClient();
	const [layerDataJson, setLayerDataJson] = useState({});
	const { isLoading, isError, data, error } = useQuery(
		['getLayerJson'],
		() => axios.get(`${URL}/api/server/layer/name/${value.fileName.toLowerCase()}`),
		{
			retry: 0,
			onSuccess: (data) => {
				console.log(data);
				queryClient.invalidateQueries(['getLayerJson']);
			},
			onError: (error: Error) => {
				console.log(error.message);
			},
		},
	);

	useEffect(() => {}, []);

	return <LayerDiv>{value.name}</LayerDiv>;
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
