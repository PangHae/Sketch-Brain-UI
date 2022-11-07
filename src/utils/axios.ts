import axios from 'axios';

const requestApi = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export default requestApi;
