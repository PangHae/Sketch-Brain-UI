import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState, useMemo, type Dispatch, type SetStateAction } from 'react';
import styled from 'styled-components';
import { getColumns } from './columns';

import { LayerParameterNameAdded } from '../../types';
import { cloneDeep } from 'lodash';
import Button from './Button';

interface Props {
	row: LayerParameterNameAdded[];
	setRow: Dispatch<SetStateAction<LayerParameterNameAdded[]>>;
	curLayerIndex: number;
}

const GridTable: React.FC<Props> = ({ row, setRow, curLayerIndex }) => {
	const [data, setData] = useState<LayerParameterNameAdded[]>([]);

	const columns = useMemo(() => getColumns(setData), [curLayerIndex]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleOnClickSaveParams = () => {
		setRow(data);
	};

	useEffect(() => {
		setData([...cloneDeep(row)]);
	}, [row]);

	return (
		<>
			<StyledTable>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} style={{ width: header.getSize() }}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</StyledTable>
			<Button
				value={'Save'}
				onClick={handleOnClickSaveParams}
				style={{ position: 'absolute', right: '30px', top: '20px' }}
			/>
		</>
	);
};

export default GridTable;

const StyledTable = styled.table`
	width: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
