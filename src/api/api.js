import axios from 'axios';
import { API_KEY, API_BASE_URL } from './apiParams';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// api.get('/popular', {
//   params: {
//     api_key: API_KEY
//   }
// }).then((response) => {
//   console.log(response.data.results);
// })

export default api;
