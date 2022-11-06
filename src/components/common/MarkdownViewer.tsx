import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import React, { useEffect, useState } from 'react';
import { BlockMapType, NotionRenderer } from 'react-notion';
import styled from 'styled-components';
interface Props {
	res: BlockMapType;
}

const MarkdownViewer = ({ res }: Props) => {
	return (
		<MarkdownDiv>
			{Object.keys(res).length && <NotionRenderer blockMap={res} fullPage={true} />}
		</MarkdownDiv>
	);
};

export default MarkdownViewer;

const MarkdownDiv = styled.div`
	width: calc(100% - 20px);
	background-color: rgb(233, 237, 252);
	overflow-y: scroll;
`;
