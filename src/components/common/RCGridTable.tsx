import React, { FC, useState } from 'react';
import Table from 'rc-table';
import Button from './Button';
import { BsDownload } from 'react-icons/bs';
import { TiDelete } from 'react-icons/Ti';
import styled from 'styled-components';

interface Props {}

type ResultRes = {
	id: number;
	user: string;
	data_name: string;
	model_name: string;
	result: string;
	created_at: string;
	key?: string;
};

const data = [
	{
		id: 6,
		user: 'zombie',
		data_name: 'string',
		model_name: 'model.py',
		result: '4.5',
		created_at: '2022-10-23T20:09:14.000+00:00',
		key: '6',
	},
	{
		id: 5,
		user: 'dean',
		data_name: 'data.csv',
		model_name: 'model.py',
		result: '32',
		created_at: '2022-10-20T13:00:32.000+00:00',
		key: '5',
	},
	{
		id: 4,
		user: 'dean',
		data_name: 'data.csv',
		model_name: 'model.py',
		result: '23',
		created_at: '2022-10-20T10:44:00.000+00:00',
		key: '4',
	},
	{
		id: 3,
		user: 'freddie',
		data_name: 'data.csv',
		model_name: 'model.py',
		result: '31',
		created_at: '2022-10-15T00:45:28.000+00:00',
		key: '3',
	},
	{
		id: 2,
		user: 'mason',
		data_name: 'mnist.csv',
		model_name: 'model.py',
		result: '3.0',
		created_at: '2022-10-14T16:48:35.000+00:00',
		key: '2',
	},
	{
		id: 1,
		user: 'freddie',
		data_name: 'mnist.csv',
		model_name: 'model.py',
		result: '3.0',
		created_at: '2022-10-14T16:14:07.000+00:00',
		key: '1',
	},
].reverse();

const RCGridTable: FC<Props> = () => {
	const columns = [
		{
			title: 'UUID',
			dataIndex: 'id',
			key: 'uuid',
			width: 150,
			align: 'center' as const,
		},
		{
			title: 'User',
			dataIndex: 'user',
			key: 'user',
			width: 150,
			align: 'center' as const,
		},
		{
			title: 'Accuracy',
			dataIndex: 'result',
			key: 'result',
			width: 100,
			align: 'center' as const,
		},
		{
			title: 'Created Time',
			dataIndex: 'created_at',
			key: 'createdTime',
			width: 300,
			align: 'center' as const,
			render: (value: string) => value.slice(0, -6),
		},
		{
			title: 'Download Data',
			key: 'downloadData',
			align: 'center' as const,
			width: 150,
			render: (value: ResultRes) => (
				<Button onClick={() => handleOnClickDownloadData(value)}>
					<BsDownload />
				</Button>
			),
		},
		{
			title: 'Download Model',
			key: 'downloadModel',
			align: 'center' as const,
			width: 150,
			render: (value: ResultRes) => (
				<Button onClick={() => handleOnClickDownloadModelFile(value)}>
					<BsDownload />
				</Button>
			),
		},
		{
			title: 'Delete',
			align: 'center' as const,
			width: 150,
			render: (value: ResultRes) => (
				<Button onClick={() => handleOnClickDownloadModelFile(value)}>
					<TiDelete size={20} />
				</Button>
			),
		},
	];

	const handleOnClickDownloadData = (value: ResultRes) => {
		console.log(value);
	};

	const handleOnClickDownloadModelFile = (value: ResultRes) => {
		console.log(value);
	};

	return <Table columns={columns} data={data} components={components} />;
};

export default RCGridTable;

const StyledTable = styled.table`
	width: 100%;
	padding: 10px;
`;

const components = {
	table: StyledTable,
};
