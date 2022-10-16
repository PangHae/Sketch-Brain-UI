import type { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
import Menu from '../components/common/Menu';
import MarkdownViewer from '../components/common/MarkdownViewer';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Sketch Brain</title>
			</Head>
			<main>
				<Container useSubMenu={true}>
					<>
						<Menu />
						<MarkdownViewer />
					</>
				</Container>
			</main>
			<footer></footer>
		</>
	);
};

export default Home;
