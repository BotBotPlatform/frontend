
export default function apiService(endpoint, options = {}) {
	// options.headers = {
	// 	"Authorization": "Bearer "+cookie.load('token')
	// };

	const base_url = 'https://botbot.jakebrabec.me/api';
	
	return fetch(`${base_url}/${endpoint}`, options);
}