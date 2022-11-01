import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState, useMemo, type Dispatch, type SetStateAction } from 'react';
import styled from 'styled-components';
import { getColumns } from './columns';

import { LayerParameterNameAdded } from '../../types';

interface Props {
	row: LayerParameterNameAdded[];
	setRow: Dispatch<SetStateAction<LayerParameterNameAdded[]>>;
}

const GridTable: React.FC<Props> = ({ row, setRow }) => {
	const [data, setData] = useState<LayerParameterNameAdded[]>([]);

	const columns = useMemo(() => getColumns(setRow), [setRow]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	// MEMO: 지금 당장 안씀
	// const handleOnChangeTableData = (
	// 	value: CellContext<LayerParameterNameAdded, string | number | boolean | null>,
	// 	e: ChangeEvent<HTMLInputElement>,
	// ) => {
	// 	const { target } = e;
	// 	const newData = [...data].map((v) => {
	// 		if (v.parameterName === value.row.original.parameterName) {
	// 			v.default_value = target.value;
	// 		}
	// 		return v;
	// 	});
	// 	setRow(newData);
	// };

	useEffect(() => {
		if (row.length) {
			setData([...row]);
		}
	}, [row]);

	return (
		<StyledTable>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} style={{ width: header.getSize() }}>
								{/* {header.isPlaceholder && } */}
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
