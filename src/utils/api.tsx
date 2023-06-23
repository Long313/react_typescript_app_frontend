import axios from 'axios';
import * as Config from '../config';

const api = axios.create({
	baseURL: Config.Api.BASE_URL,
});

export default api;
