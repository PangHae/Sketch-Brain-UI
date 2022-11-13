import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { VscRefresh } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import Button from '../common/Button';
import Input from '../common/Input';
import RCGridTable from '../common/RCGridTable';
import requestApi from '../../utils/axios';
import { ResultRes } from '../../types';

const WrapperDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: rgb(233, 237, 252);
`;

const TitleDiv = styled.div`
	height: 40px;
	line-height: 40px;
	padding: 10px;
	font-size: 24px;
	font-family: 'Poppin';
	font-weight: 400;
	text-align: center;
`;

const UserSearchDiv = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	width: calc(100%-20px);
	padding: 10px;
	/* height: 50px; */
`;

const UserDataDiv = styled.div`
	width: calc(100% - 20px);
	height: calc(100% - 120px);
	justify-content: center;
	align-items: center;
	padding: 10px;
`;

const ModelResult: FC = () => {
	const [row, setRow] = useState<ResultRes[]>([]);
	const [userName, setUserName] = useState('');

	const { refetch: refetchAllResult } = useQuery(
		[],
		() => requestApi.get('/api/server/result').then((res) => res.data),
		{
			onSuccess: (data) => {
				const keyAddedData = data.result.map((value: ResultRes, index: number) => {
					const curVal = { ...value, key: index.toString() };
					return curVal;
				});
				setRow(keyAddedData);
			},
		},
	);

	const { refetch: refetchUserData } = useQuery(
		['getResultByUserName', userName],
		() => requestApi.get(`/api/server/result/user/${userName}`).then((res) => res.data),
		{
			onSuccess: (data) => {
				const keyAddedUserData = data.result.map((value: ResultRes, index: number) => {
					const curVal = { ...value, key: index.toString() };
					return curVal;
				});
				setRow(keyAddedUserData);
			},
			onError: (error) => {
				throw error;
			},
			enabled: false,
		},
	);

	const handleChangeUserName: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { target } = e;
		setUserName(target.value);
	};

	const handleOnClickRefresh: MouseEventHandler<HTMLButtonElement> = () => {
		setUserName('');
		refetchAllResult();
	};

	const handleOnClickSearch = () => {
		refetchUserData();
	};

	return (
		<WrapperDiv>
			<TitleDiv>Result</TitleDiv>
			<UserSearchDiv>
				<Input
					style={{ margin: '0 10px 0 10px' }}
					value={userName}
					onChange={handleChangeUserName}
					placeholder='User Name'
				/>
				<Button style={{ width: 'auto' }} onClick={handleOnClickSearch}>
					<BsSearch />
				</Button>
				<Button style={{ width: 'auto', marginLeft: '5px' }} onClick={handleOnClickRefresh}>
					<VscRefresh />
				</Button>
			</UserSearchDiv>
			<UserDataDiv>
				<RCGridTable rows={row} />
			</UserDataDiv>
		</WrapperDiv>
	);
};

export default ModelResult;
