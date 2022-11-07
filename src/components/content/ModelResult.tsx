import React, { FC } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import Button from '../common/Button';
import Input from '../common/Input';
import RCGridTable from '../common/RCGridTable';

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

const ModelResult: FC = () => (
	<WrapperDiv>
		<TitleDiv>Result</TitleDiv>
		<UserSearchDiv>
			<p>User Name</p>
			<Input style={{ margin: '0 10px 0 10px' }} />
			<Button style={{ width: 'auto' }} placeholder='User Name'>
				<BsSearch />
			</Button>
		</UserSearchDiv>
		<UserDataDiv>
			<RCGridTable />
		</UserDataDiv>
	</WrapperDiv>
);

export default ModelResult;
