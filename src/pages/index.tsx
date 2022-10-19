import type { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
<<<<<<< HEAD
=======
import Menu from '../components/common/Menu';
>>>>>>> origin/feat/pages
import MarkdownViewer from '../components/common/MarkdownViewer';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Sketch Brain</title>
			</Head>
			<main>
<<<<<<< HEAD
				<Container>
					<MarkdownViewer />
				</Container>
			</main>
=======
				<Container useSubMenu={true}>
					<>
						<Menu />
						<MarkdownViewer />
					</>
				</Container>
			</main>
			<footer></footer>
>>>>>>> origin/feat/pages
		</>
	);
};

export default Home;
