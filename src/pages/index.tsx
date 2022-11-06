import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Container from '../components/common/Container';
import MarkdownViewer from '../components/common/MarkdownViewer';
import requestApi from '../utils/axios';

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => (
	<>
		<Head>
			<title>Sketch Brain</title>
		</Head>
		<main>
			<Container>
				<MarkdownViewer res={data} />
			</Container>
		</main>
	</>
);

export default Home;

export const getStaticProps = async () => {
	const data = await requestApi.get(
		`https://notion-api.splitbee.io/v1/page/7258d7e8f1354ad2afd545bff153ebe2`,
	);

	return {
		props: {
			data: data.data,
		},
	};
};
