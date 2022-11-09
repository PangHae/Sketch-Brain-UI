import { useQuery } from '@tanstack/react-query';
import { MouseEvent, MouseEventHandler, ReactElement, useState } from 'react';
import styled from 'styled-components';
import requestApi from '../../utils/axios';
import {
	EntriedLayerParameter,
	LayerItem,
	LayerParameter,
	ParsedLayerParameter,
} from '../../types';

interface Props {
	value: LayerItem;
	// eslint-disable-next-line no-unused-vars
	onClick: (data: ParsedLayerParameter, event: MouseEvent<HTMLDivElement>) => void;
}

export const LayerDiv = styled.div`
	position: relative;
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
		border: 1px solid rgb(159, 180, 248);
		background-color: rgb(159, 180, 248);
	}
`;

function Layer({ value, onClick }: Props): ReactElement {
	const [layerDataJson, setLayerDataJson] = useState<ParsedLayerParameter>({});
	useQuery(
		[`${value.name}`],
		() =>
			requestApi
				.get<EntriedLayerParameter>(`/api/server/layer/name/${value.fileName.toLowerCase()}`)
				.then((res) => res.data),
		{
			retry: 0,
			onSuccess: (data) => {
				if (!data || Object.keys(data).length === 0) return;

				let tmp = {};
				Object.entries(data).forEach((values) => {
					const v = values[1] as LayerParameter;
					if (v.visible) {
						delete v.visible;
						if (v.default_value === null) {
							v.default_value = '';
						}
						tmp = { ...tmp, [values[0]]: v };
					}
				});
				setLayerDataJson(tmp);
			},
			onError: (error: Error) => {
				console.log(error.message);
			},
		},
	);

	const handleClickLayer: MouseEventHandler<HTMLDivElement> = (e) => {
		onClick(layerDataJson, e);
	};

	return (
		<LayerDiv id={value.fileName} onClick={(e) => handleClickLayer(e)}>
			{value.name}
		</LayerDiv>
	);
}

export default Layer;
