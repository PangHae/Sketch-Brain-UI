import { NextPage } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
import ModelResult from '../components/content/ModelResult';

const ModelExport: NextPage = () => (
	<>
		<Head>
			<title>Sketch Brain</title>
		</Head>
		<main>
			<Container>
				<ModelResult />
			</Container>
		</main>
	</>
);

export default ModelExport;
