import cx from 'classnames';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Button from './Button';

interface Props {
	messageType: string;
	message: string;
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	type: string;
}

const $modals = document.getElementById('modals');

const Modal: FC<Props> = ({ messageType, message, modalOpen, setModalOpen, type }) => {
	const handleOnClickCloseModal: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = () => {
		setModalOpen(false);
	};

	return createPortal(
		<ModalBackgroundDiv className={cx({ modalOpen })} onClick={handleOnClickCloseModal}>
			<ModalContentDiv>
				<ModalMessageH3>{messageType}</ModalMessageH3>
				<ModalMessageP>{message}</ModalMessageP>
				{type !== 'loading' && <Button value={'close'} onClick={handleOnClickCloseModal} />}
			</ModalContentDiv>
		</ModalBackgroundDiv>,
		$modals!,
	);
};

export default Modal;

const ModalBackgroundDiv = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	visibility: visible;

	transition: 0.2s all linear;
	background-color: rgba(0, 0, 0, 70%);

	&:not(.modalOpen) {
		visibility: hidden;
		background-color: transparent;
	}
`;

const ModalContentDiv = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 30%;
	top: 50%;
	left: 50%;
	padding: 20px;
	background-color: rgb(234, 237, 251);
	border: 1px solid rgb(73, 45, 214);
	border-radius: 8px;
	text-align: center;
	transform: translate(-50%, -50%);
	& button {
		margin: 0 0 0 auto;
	}
`;

const ModalMessageH3 = styled.h3`
	color: #d20909;
`;

const ModalMessageP = styled.p`
	margin: 20px;
`;
