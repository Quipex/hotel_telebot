import axios, { AxiosRequestConfig } from 'axios';
import env from '../bot/env';

function apiUrl(path: string): string {
	const restUrl = path.startsWith('/') ? path : (`/${path}`);
	return env.pmsAdapterUrl + restUrl;
}

async function callApi(path: string, config: AxiosRequestConfig): Promise<unknown> {
	return (await axios(apiUrl(path), {
		...config,
		headers: {
			x_security_header: env.xSecHeader
		}
	})).data;
}

const api = {
	get: async function get(path: string, config?: AxiosRequestConfig): Promise<unknown> {
		return callApi(path, { method: 'GET', ...config });
	},
	post: async function post(path: string, config?: AxiosRequestConfig): Promise<unknown> {
		return callApi(path, { method: 'POST', ...config });
	},
	put: async function put(path: string, config?: AxiosRequestConfig): Promise<unknown> {
		return callApi(path, { method: 'PUT', ...config });
	}
};

export default api;
