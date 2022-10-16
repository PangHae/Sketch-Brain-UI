import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet='UTF-8' />
					<meta name='keyword' content='sketch-brain' />
					<meta name='description' content='Sketch Brain' />
					<meta name='author' content='ku-soda' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
