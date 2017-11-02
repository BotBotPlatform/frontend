import { loadCookie } from '../utils/cookies';

export default function apiService(endpoint, options = {}) {
	console.log(loadCookie('token'));
	options.headers = {
		"Authorization": "Bearer " + loadCookie('token')
	};

	const base_url = 'https://botbot.jakebrabec.me/api';

	return fetch(`${base_url}/${endpoint}`, options);
}

export function linkBuilder(endpoint) {
	let token = loadCookie('token');
	return `https://botbot.jakebrabec.me/api/${endpoint}?token=${token}`;
}
