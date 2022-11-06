import 'react-notion/src/styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import React from 'react';
import { BlockMapType, NotionRenderer } from 'react-notion';
import styled from 'styled-components';

interface Props {
	res: BlockMapType;
}

const MarkdownViewer = ({ res }: Props) => (
	<MarkdownDiv>{Object.keys(res).length && <NotionRenderer blockMap={res} fullPage />}</MarkdownDiv>
);

export default MarkdownViewer;

const MarkdownDiv = styled.div`
	width: calc(100% - 20px);
	background-color: rgb(233, 237, 252);
	overflow-y: scroll;
`;
