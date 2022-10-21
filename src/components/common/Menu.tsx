import React, { MouseEventHandler, ReactElement } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../../../public/assets/images/brain.png';

const menuList = [
	{
		text: '공부하기',
		value: 'study',
	},
	{
		text: '모델 생성하기',
		value: 'modelCreate',
	},
	{
		text: '모델 추출하기',
		value: 'modelExport',
	},
];

function Menu(): ReactElement {
	const router = useRouter();

	const handleClickMenu: MouseEventHandler<HTMLDivElement> = (e) => {
		const { currentTarget } = e;
		const route = currentTarget.className.split(' ')[2];
		if (route === 'study') {
			router.push('/');
		} else {
			router.push(`/${route}`);
		}
	};

	return (
		<>
			<ImageWrapperDiv>
				<Image src={Logo} />
			</ImageWrapperDiv>
			<Title>Sketch Brain</Title>
			{menuList.map((v, i) => {
				return (
					<MenuItemDiv className={v.value} key={v.value} onClick={handleClickMenu}>
						<p>{v.text}</p>
					</MenuItemDiv>
				);
			})}
		</>
	);
}

export default Menu;

const MenuItemDiv = styled.div`
	margin: 10px;
	width: 280px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 1.3rem;
	font-family: 'Poppin';
	&:hover {
		color: black;
		border-radius: 10px;
		background-color: white;
		cursor: pointer;
	}
`;

const ImageWrapperDiv = styled.div`
	padding: 50px;
	padding-bottom: 5px;
`;

const Title = styled.p`
	width: 300px;
	text-align: center;
	height: 60px;
	margin-top: 10px;
	margin-bottom: 20px;
	font-family: 'Poppin';
	font-weight: 400;
	font-size: 3rem;
`;
