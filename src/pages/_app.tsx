import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRef } from 'react';
import { NextComponentType } from 'next';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import '../styles/globals.css';

function MyApp({
	Component,
	pageProps,
}: AppProps): NextComponentType<AppContext, AppInitialProps, AppProps> {
	const queryClientRef = useRef<QueryClient>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<>
			<QueryClientProvider client={queryClientRef.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	return { pageProps };
};

export default MyApp;
