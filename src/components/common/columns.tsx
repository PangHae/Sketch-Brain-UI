import { useState, type ChangeEventHandler, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { LayerParameterNameAdded } from '../../types';
import Input from './Input';

export const getColumns = (setRow: any) => {
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
			cell: ({ getValue, row: { index: rowIndex }, column: { id: columnId }, table }) => {
				const initialValue = getValue();
				const [value, setValue] = useState(initialValue);

				const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
					setValue(e.currentTarget.value);
				}, []);

				const onBlur = useCallback(() => {
					setRow((old: LayerParameterNameAdded[]) => {
						console.log('updated::');
						return old.map((row, index) => {
							if (index === rowIndex) {
								return {
									...old[rowIndex]!,
									[columnId]: value,
								};
							}
							return row;
						});
					});
				}, [table, rowIndex, columnId, value]);

				return (
					<Input
						value={value === null ? '' : value.toString()}
						onChange={onChangeInput}
						onBlur={onBlur}
					/>
				);
			},
			minSize: 150,
			size: 150,
		}),
	];

	return columns;
};
