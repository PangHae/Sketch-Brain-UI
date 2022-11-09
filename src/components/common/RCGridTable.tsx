import React, { FC, useEffect, useState } from 'react';
import Table from 'rc-table';
import { BsDownload } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Button from './Button';
import { ResultRes } from '../../types';
import requestApi from '../../utils/axios';

interface Props {
	rows: ResultRes[];
}

const RCGridTable: FC<Props> = ({ rows }: Props) => {
	const [downloadType, setDownloadType] = useState('');
	const [downloadFileName, setDownloadFileName] = useState('');

	const { refetch } = useQuery(
		['downloadData', downloadType, downloadFileName],
		() =>
			requestApi.get(`/api/file/${downloadType}/${downloadFileName}`).then((res) => {
				const blob = new Blob([res.data], { type: 'application/octet-stream' });
				const href = URL.createObjectURL(blob);

				const link = document.createElement('a');
				link.href = href;
				link.download = downloadFileName;
				document.body.appendChild(link);
				link.click();

				// clean up "a" element & remove ObjectURL
				document.body.removeChild(link);
				URL.revokeObjectURL(href);
			}),
		{
			enabled: false,
		},
	);

	useEffect(() => {
		if (downloadFileName && downloadType) {
			refetch();
			setDownloadFileName('');
			setDownloadType('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [downloadFileName, downloadType]);

	const handleOnClickDownload = (type: string, value: string) => {
		setDownloadType(type);
		setDownloadFileName(value);
	};

	const columns = [
		{
			title: 'Experiment ID',
			dataIndex: 'uuid',
			key: 'uuid',
			width: 150,
			align: 'center' as const,
			render: (value: string) => value.slice(0, 6),
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
			dataIndex: 'data_name',
			key: 'data_name',
			align: 'center' as const,
			width: 150,
			render: (value: string) => (
				<Button onClick={() => handleOnClickDownload('dataset', value)}>
					<BsDownload />
				</Button>
			),
		},
		{
			title: 'Download Model',
			dataIndex: 'model_name',
			key: 'model_name',
			align: 'center' as const,
			width: 150,
			render: (value: string) => (
				<Button onClick={() => handleOnClickDownload('model', value)}>
					<BsDownload />
				</Button>
			),
		},
		{
			title: 'Delete',
			key: 'delete',
			align: 'center' as const,
			width: 150,
			render: () => (
				<Button onClick={() => {}}>
					<TiDelete size={20} />
				</Button>
			),
		},
	];

	return <Table columns={columns} data={rows} components={components} />;
};

export default RCGridTable;

const StyledTable = styled.table`
	width: 100%;
	padding: 10px;
`;

const components = {
	table: StyledTable,
};
