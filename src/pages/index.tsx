import type { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
import MarkdownViewer from '../components/common/MarkdownViewer';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Sketch Brain</title>
			</Head>
			<main>
				<Container>
					<MarkdownViewer />
				</Container>
			</main>
		</>
	);
};

export default Home;
