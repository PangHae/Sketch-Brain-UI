import {
	CellContext,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	// Row,
	RowData,
	useReactTable,
} from '@tanstack/react-table';
import React, {
	ChangeEvent,
	// ForwardedRef,
	// forwardRef,
	// MutableRefObject,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import { LayerParameterNameAdded } from '../../types';
import Input from './Input';

interface Props {
	row: LayerParameterNameAdded[];
	setRow: React.Dispatch<SetStateAction<LayerParameterNameAdded[]>>;
}

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (
			rowIndex: number,
			columnId: string,
			value: string | number | boolean | null,
		) => void;
	}
}

function GridTable({ row, setRow }: Props): ReactElement {
	const [data, setData] = useState<LayerParameterNameAdded[]>([]);

	useEffect(() => {
		if (row.length) {
			setData([...row]);
		}
	}, [row]);

	const columnHelper = createColumnHelper<LayerParameterNameAdded>();
	const columns = [
		columnHelper.accessor('parameterName', {
			header: 'Parameter Name',
			cell: (value) => {
				return <Input value={value.getValue().toString()} disabled />;
			},
			minSize: 100,
			size: 100,
		}),
		columnHelper.accessor('type', {
			header: 'Type',
			cell: (value) => {
				return <Input value={value.getValue().toString()} disabled />;
			},
			minSize: 80,
			size: 80,
		}),
		columnHelper.accessor('default_value', {
			header: 'Value',
			cell: ({ getValue, row: { index }, column: { id }, table }) => {
				// console.log(index, id, table);
				const initialValue = getValue();
				const [value, setValue] = React.useState(initialValue);

				const onBlur = () => {
					table.options.meta?.updateData(index, id, value);
				};

				React.useEffect(() => {
					setValue(initialValue);
				}, [initialValue]);

				return (
					<Input
						value={value === null ? '' : value.toString()}
						onChange={(e) => setValue(e.target.value)}
						onBlur={onBlur}
					/>
				);
			},
			minSize: 150,
			size: 150,
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: string | number | boolean | null) => {
				setRow((old: LayerParameterNameAdded[]) =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							};
						}
						return row;
					}),
				);
			},
		},
	});

	const handleOnChangeTableData = (
		value: CellContext<LayerParameterNameAdded, string | number | boolean | null>,
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const { target } = e;
		const newData = [...data].map((v) => {
			if (v.parameterName === value.row.original.parameterName) {
				v.default_value = target.value;
			}
			return v;
		});
		setRow(newData);
	};

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}
		>
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
		</div>
	);
}

export default GridTable;

const StyledTable = styled.table`
	width: '100%';
`;
