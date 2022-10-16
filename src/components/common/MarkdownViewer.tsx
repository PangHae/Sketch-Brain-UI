import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
	initialValue: string;
}

function MarkdownViewer(): ReactElement {
	return (
		<ReactMarkdown>
			{
				'[hello](#hello1)\n # hello \n ## hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello\n # hello1'
			}
		</ReactMarkdown>
	);
}

export default MarkdownViewer;
// https://se9round.dev/post/React%EC%97%90%EC%84%9C%20Intersection%20Observer%EB%A1%9C%20TOC%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
