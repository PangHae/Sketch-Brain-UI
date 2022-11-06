import { useState, type ChangeEventHandler, useCallback, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { LayerParameterNameAdded } from '../../types';
import Input from './Input';

export const getColumns = (setData: any) => {
	const columnHelper = createColumnHelper<LayerParameterNameAdded>();

	const columns = [
		columnHelper.accessor('parameterName', {
			header: 'Parameter Name',
			cell: (value) => {
				return <Input value={value.getValue().toString()} disabled />;
			},
			size: 171.5,
		}),
		columnHelper.accessor('type', {
			header: 'Type',
			cell: (value) => {
				return <Input value={value.getValue().toString()} disabled />;
			},
			size: 171.5,
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
					setData((old: LayerParameterNameAdded[]) => {
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

				return <Input value={value.toString()} onChange={onChangeInput} onBlur={onBlur} />;
			},
			size: 171.5,
		}),
	];

	return columns;
};
