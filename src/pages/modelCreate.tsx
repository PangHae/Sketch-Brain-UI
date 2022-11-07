import { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
import BuildModel from '../components/content/BuildModel';

const ModelCreate: NextPage = () => (
	<>
		<Head>
			<title>Sketch Brain</title>
		</Head>
		<main>
			<Container>
				<BuildModel />
			</Container>
		</main>
	</>
);

export default ModelCreate;
